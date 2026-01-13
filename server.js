const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const Redis = require("ioredis");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const redis = new Redis(); // Ensure Redis is running locally or via Docker

const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

app.use(cors());
app.use(express.json());

// JWT Authentication Middleware
const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access Denied");
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

// Socket.io Real-time Sync
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("join-room", async (roomId) => {
    socket.join(roomId);
    // Fetch cached content from Redis
    const cachedContent = await redis.get(`room:${roomId}`);
    if (cachedContent) socket.emit("load-content", cachedContent);
  });

  socket.on("edit-content", (data) => {
    const { roomId, content } = data;
    // Broadcast to others in the room with low latency
    socket.to(roomId).emit("update-content", content);
    // Update Redis cache (Throttle this in production)
    redis.set(`room:${roomId}`, content, "EX", 3600);
  });

  socket.on("disconnect", () => console.log("User Disconnected"));
});

server.listen(5000, () => console.log("DevSync Server running on port 5000"));
