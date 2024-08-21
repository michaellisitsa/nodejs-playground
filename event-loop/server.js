const express = require("express");
const { getActiveResourcesInfo } = require("node:process");
const app = express();
const port = 3001;
const { findNthPrimeSync, findNthPrimeAsync } = require("./findNthPrime.js");
const {
  createLogger,
  asyncResources,
  labeledInterval,
  labeledTimeout,
} = require("./logging.js");

// // Uncomment the following line to enable logging
// exclude any resources that are part of express
createLogger({
  exclude: [
    "TickObject",
    "TCPSERVERWRAP",
    "HTTPINCOMINGMESSAGE",
    "HTTPSERVERRESPONSE",
    // "Timeout",
    "TCPWRAP",
    "TTYWRAP",
  ],
});

app.get("/status", (req, res) => {
  const resources = Array.from(asyncResources.entries());

  // const resources = getActiveResourcesInfo();
  const html = `<html><body><pre>${JSON.stringify(
    resources,
    null,
    2
  )}</pre></body></html>`;
  res.send(html);
});

app.get("/blocking", (req, res) => {
  const result = findNthPrimeSync(9999999);
  res.send(result.toString());
});

app.get("/nonBlocking", (req, res) => {
  findNthPrimeAsync(99999).then((result) => {
    // Needs to be a string so not interpreted as status code
    res.send(result.toString());

    console.log("What's left:", getActiveResourcesInfo());
    console.log("result", result);
  });
});

app.get("/setInterval", (req, res) => {
  const interval = labeledInterval(
    () => {
      console.log("Interval");
    },
    1000,
    "My interval"
  );

  labeledTimeout(
    () => {
      clearInterval(interval);
      res.send("Interval cleared");
    },
    5000,
    "Clear interval"
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
