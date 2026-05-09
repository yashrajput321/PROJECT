const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

let users = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // assign random name + color
  users[socket.id] = {
    id: socket.id,
    name: "User_" + Math.floor(Math.random() * 1000),
    color: "#" + Math.floor(Math.random()*16777215).toString(16),
    x: 0,
    y: 0
  };

  socket.emit("init", users[socket.id]);

  socket.on("move", (data) => {
    if (users[socket.id]) {
      users[socket.id].x = data.x;
      users[socket.id].y = data.y;
    }
    io.emit("users", users);
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("users", users);
  });
});

server.listen(5000, () => console.log("Server running on 5000"));