// Run this inside the event-loop folder
// https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick#timers
const fs = require("node:fs");

const timeoutScheduled = Date.now();
// This is a 300MB File, takes approx 50ms to complete
fs.readFile("assets/text.txt", (err, data) => {
  // Queue a callback in the check phase
  console.log("File read after", startCallback - timeoutScheduled);
  const startCallback = Date.now();
  setImmediate(() => {
    console.log("This is executed in the check phase");
  });
  setTimeout(() => {
    const delay = Date.now() - startCallback;
    console.log(`Timeout 2: ${delay}ms have passed since I was scheduled`);
  }, 90);
  // do something that will take 10ms...
  while (Date.now() - startCallback < 100) {
    // do nothing
  }
});

setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;
  console.log(`Timeout 1: ${delay}ms have passed since I was scheduled`);
}, 100);
