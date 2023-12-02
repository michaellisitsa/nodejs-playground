var net = require("net");
var socket = net.createConnection({ port: 3000 }, function () {
  console.log("connected to server!");
  socket.write("world!\r\n");
});
socket.on("data", (data) => {
  console.log(data.toString());
  socket.end();
});
socket.on("end", () => {
  console.log("disconnected from server");
});
