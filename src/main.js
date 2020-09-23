const express = require("express");
const app = express();
var http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");

const port = process.env.PORT || 4000;
const io = socketio(server);
let count = 0;

io.on("connection", (socket) => {
  console.log(
    `${Date(Date.now()).toLocaleString()}: New Web Socket connection`
  );

  setInterval(() => {
    console.log("Count:", count);
    socket.emit("server", count);
  }, 5000);

  socket.on("increment", () => {
    count = count + 1;
  });

  socket.on("disconnect", () => {
    console.log(
      `${Date(Date.now()).toLocaleString()}istemci bağlantıyı kapattı`
    );
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
