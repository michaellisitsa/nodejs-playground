var http = require("http");
var server = http.createServer(function (req, res) {
  console.log("Server accessed", req.headers.accept);
  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify({ message: "WISH YOU WERE HERE" }));
  res.end();
});

server.listen(3000, function () {
  console.log("Server is listening on port 3000");
});
