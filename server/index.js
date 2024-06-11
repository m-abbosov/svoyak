const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let firstClicked = null;
let users = {};

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("set_name", (name) => {
    users[socket.id] = name;
    console.log("User set name:", name);
    io.emit("users_update", users);
  });

  socket.on("button_clicked", () => {
    if (firstClicked === null) {
      firstClicked = users[socket.id];
      io.emit("first_clicked", firstClicked);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    delete users[socket.id];
    io.emit("users_update", users);
  });
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
