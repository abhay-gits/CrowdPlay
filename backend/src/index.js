import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import "dotenv/config";

import { connectRedis } from "./redis/connectionToRedis.js";
import videoRoute from "./routes/getVideo.route.js";
import { setupSocket } from "./socket/setup.socket.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/video", videoRoute);

setupSocket(io);

server.listen(port, () => {
  try {
    connectRedis();
  } catch (error) {
    console.error("Error connecting to Redis:", error);
  }
  console.log(`Server running at http://localhost:${port}`);
});