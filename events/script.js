const EventEmitter = require("events");

class Emitter extends EventEmitter {}

const myE = new Emitter();

myE.on("foo", (x) => {
  console.log("An event occurred", 1);
});
myE.emit("foo", "arg1");
