## CrowdPlay

A real-time, crowdsourced music player where users search for songs, upvote their favorites, and the top-voted track plays automatically. Includes live chat and synchronized playback across clients.

### Features
- **Real-time voting**: Upvote/unvote songs; list updates instantly via WebSockets
- **Auto-play queue**: Highest-voted song plays via YouTube IFrame API; played songs are removed
- **Vote lifecycle**: Single-vote songs auto-expire after 3 minutes if no additional votes
- **Live chat**: Simple, global chat for all connected users
- **Authentication**: Google Sign-In via Firebase Auth
- **Resilient storage**: Redis-backed sets/zsets for votes and metadata

### Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS, Socket.IO client, Axios, Firebase Auth
- **Backend**: Node.js, Express 5, Socket.IO, Redis, dotenv
- **Search**: `youtube-music-api` for song lookup

### Monorepo Structure
```
CrowdPlay/
  backend/           # Express + Socket.IO + Redis
  frontend/          # React + Vite app
```

### Prerequisites
- Node.js 18+ and npm
- Redis 6+ (local or managed)
- A Firebase project (optional if you keep the included demo config)

---

## Getting Started

### 1) Clone and install
```bash
# In two terminals
# Terminal A - Backend
cd backend
npm install

# Terminal B - Frontend
cd frontend
npm install
```

### 2) Configure environment variables

Create `backend/.env`:
```bash
PORT=3000
FRONTEND_URL=http://localhost:5173
REDIS_URL=redis://localhost:6379
# REDIS_PASSWORD=your_redis_password   # Omit if none
```

Create `frontend/.env.local`:
```bash
# Used in production builds; dev defaults to localhost
VITE_API_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
```

Firebase config is currently embedded in `frontend/src/firebase/firebase.ts` for convenience. Replace with your own project keys if desired.

### 3) Run the apps
```bash
# Backend (with auto-reload)
cd backend
npm run dev

# Frontend (Vite dev server)
cd frontend
npm run dev
```
Open http://localhost:5173

---

## How It Works

### Flow
1. Users sign in with Google and search for a song
2. The search hits the backend: `GET /api/video/info/:searchValue` (YouTube Music)
3. Upvoting emits a Socket.IO `upvote` event; votes are stored in Redis
4. The top song list is broadcast to all clients in real time
5. The player loads the highest-voted song via YouTube IFrame API
6. When a song ends, it is removed and the next one plays

### Data model (Redis)
- `songVotes` (ZSET): member=`songId`, score=`votes`
- `songName` (HASH): `songId` -> `songName`
- `userVotes:<songId>` (SET): user identifiers who voted for that song
- `songTimer:<songId>` (STRING with TTL): set on first vote (3 min); cleared once votes > 1

### Backend
- Server: `backend/src/index.js`
- Redis connection: `backend/src/redis/connectionToRedis.js`
- Voting logic: `backend/src/redis/songService.redis.js`
- Sockets: `backend/src/socket/setup.socket.js`
- Chat: `backend/src/socket/chat.socket.js`
- API route: `GET /api/video/info/:searchValue`

CORS defaults to `http://localhost:5173`. Configure via `FRONTEND_URL`.

### Frontend
- Entry: `frontend/src/main.tsx`, app shell in `frontend/src/pages`
- Search + upvote: `Header.tsx`, `SearchCard.tsx`
- Song list: `SongList.tsx`
- Player: `MusicPlayer.tsx` (YouTube IFrame API)
- Chat: `Chat.tsx`
- Socket client: `src/socket/socket.ts`
- API client: `src/api/axios.ts`

---

## Scripts

### Backend (`backend/package.json`)
- `npm run dev` — start with nodemon
- `npm start` — start in production

### Frontend (`frontend/package.json`)
- `npm run dev` — Vite dev server
- `npm run build` — TypeScript build + Vite build

---

## API and Realtime

### REST
- `GET /api/video/info/:searchValue` → First YouTube Music search result (song)

### Socket Events
- Client → Server
  - `initialFetch` — request initial top songs
  - `getSongs` — request current list
  - `upvote` — payload: `{ songId, userId, songName }`
  - `deleteSong` — payload: `videoId`
  - `clientMessage` — chat message
- Server → Client
  - `updateTopSongs` — broadcast updated list
  - `fetchSongs` — reply to `getSongs`
  - `serverMessage` — chat broadcast

---

## Deployment Notes
- Frontend has a Vercel rewrite (`frontend/vercel.json`) to serve SPA routes
- Ensure backend allows CORS from your deployed frontend (`FRONTEND_URL`)
- Configure `VITE_API_URL` and `VITE_SOCKET_URL` to point at your backend
- Use a managed Redis (e.g., Upstash/Redis Cloud) and set `REDIS_URL`/`REDIS_PASSWORD`

---

## Troubleshooting
- **CORS errors**: Verify `FRONTEND_URL` in backend `.env`
- **Socket not connecting**: Check `VITE_SOCKET_URL` and backend port; confirm WebSocket support on host
- **Redis auth/connection**: Validate `REDIS_URL`/`REDIS_PASSWORD`; ensure network access
- **No playback**: The player loads after first song is available; search and upvote at least one song

---

## Acknowledgements
- YouTube IFrame API
- `youtube-music-api`
- Firebase Authentication 