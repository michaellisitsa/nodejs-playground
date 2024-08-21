const { findNthPrimeSync } = require("./findNthPrime.js");
// From example in https://www.bbss.dev/posts/eventloop/

/* setImmediate registers a
   callback on the event loop */
setImmediate(() => {
  console.log("This will at some point in the future");
});

/* synchronous work that you 
    will never see the end of */
findNthPrimeSync(9999999);
