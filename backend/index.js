import express from "express";
import "dotenv/config";
import http from "http";
import path from "path";
import cors from "cors";
import { Server } from "socket.io";
import { fileURLToPath } from 'url';

import videoRoute from "./routes/getVideo.route.js";
import authRoutes from "./routes/auth.route.js"
import { initializeAuth } from "./auth/auth.js";
import { setupSocket } from "./socket/setup.socket.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Middlewares */
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

/* Authentication */
initializeAuth(app);

/* Routes */
app.use(authRoutes);
app.use('/api/video', videoRoute);

/* WebSockets */
setupSocket(io);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
