setTimeout(() => {
  Promise.resolve("Promise 1").then(console.log);
  console.log("Set timeout 1");
  Promise.reject("Promise 2").catch(console.log);
  process.nextTick(() => console.log("Next tick 1"));
}, 0);
setTimeout(console.log, 0, "Set timeout 2");
console.log("synchronous code");
