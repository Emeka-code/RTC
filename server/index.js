const express = require("express");
const app = express();
const http = require("http");
const PORT = 1144;
const server = http.createServer(app);
const cors = require("cors");

const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.status(200).json({ message: "api running" });
});

io.on("connection", (socket) => {
  console.log("client connected");

  socket.on("join room", (roomID) => {
    if (room[roomID]) {
      room[roomID].push(socket.id);
    } else {
      room[roomID] = socket.id;
    }

    otherUser = room[roomID].find((id) => id !== socket.id);
    if (otherUser) {
      socket.emit("other user", otherUser);
      socket.to(otherUser).emit("user joined", socket.id);
    }
  });
  socket.on("offer", (payload) => {
    io.to(payload.target).emit("offer", payload);
  });
  socket.on("answer", (payload) => {
    io.to(payload.target).emit("answer", payload);
  });
  socket.on("ice-candidate", (payload) => {
    io.to(payload.target).emit("ice-candidate", incoming);
  });
});

server.listen(PORT, () => {
  console.log(`server don connect oo for http://localhost:1144`);
});
