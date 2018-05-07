// import { router } from "./router";
var http = require("http");
var url = require("url");
var fs = require("fs");
var router = require("./boot/router")

var config = JSON.parse(fs.readFileSync("config.json")),

server = config.server

host = server.host,
port = server.port;

function start() {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    router.router(pathname, request, response);
  }

  http.createServer(onRequest).listen(port,host);
  console.log(`Server has started and listening on : http://${host}:${port} `);

}

start();