var http = require("http");
// Although you could make http requests via http.get()
// the Agent manages connection persistence and reuse for HTTP clients.
var agent = new http.Agent({});
// Some further details
var options = {
  port: 3000,
  method: "get",
  path: "/",
  agent: agent,
};

http
  .get(options, (res) => {
    let body = "";

    res.on("data", (chunk) => {
      body += chunk;
    });
    res.on("end", () => {
      try {
        let json = JSON.parse(body);
        console.log("json", json);
      } catch (error) {
        console.error(error.message);
      }
    });
  })
  .on("error", (error) => {
    clg("got error", error.message);
  });
