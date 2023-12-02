var net = require("net");
// const hostname = "192.168.0.7";
const hostname = "localhost";
var server = net.createServer(function (c) {
  //'connection' listener
  console.log("client connected");
  c.on("end", function () {
    console.log("client disconnected");
  });
  c.write("hello\r\n");
  c.pipe(c);
});
server.listen(3000, hostname, function () {
  //'listening' listener
  console.log("server bound");
});
