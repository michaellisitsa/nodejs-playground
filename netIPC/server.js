var fs = require("fs");

var net = require("net");
var server = net.createServer(function (c) {
  //'connection' listener
  console.log("client connected");
  c.on("end", function () {
    console.log("client disconnected");
  });
  c.write("hello\r\n");
  c.pipe(c);
});

// TODO: currently this attaches to the file
// but doesn't remove itself after stopping the server

var socketPath = "/tmp/echo.sock";

server.on("error", function (e) {
  if (e.code === "EADDRINUSE") {
    fs.unlink(socketPath, function (e) {
      if (e) {
        // something went wrong removing the file, handle it here
        console.error(e);
      } else {
        // file removed successfully, start the server
        server.listen(socketPath, function () {
          console.log("server bound");
        });
      }
    });
  }
});
server.listen(socketPath, function () {
  console.log("server bound");
});
