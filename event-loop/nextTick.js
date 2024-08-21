const net = require("net");

const server = net.createServer(() => {}).listen(8080);

server.on("listening", () => {
  console.log("Server is listening on port 8080");
});

// https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick#why-use-processnexttick
function apiCall(arg, callback) {
  if (typeof arg !== "string")
    return process.nextTick(
      callback,
      new TypeError("argument should be string")
    );
}

apiCall(1, (err) => {
  console.log("do this before throwing the error");
  if (err) {
    console.log("Error:", err);
  }
});
