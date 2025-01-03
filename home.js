import http from "node:http";
import fs from "node:fs/promises";
import path, { parse } from "node:path";
import { Transform } from "node:stream";
// ? Data
fs.readFile(path.join(process.cwd(),"users.json"),'utf-8').then((data)=>{})

const readStreamP = fs.createReadStream(path.join(process.cwd(), "posts.json"));

// * new server
const server = http.createServer((request, response) => {
  if (request.url === "/users") {
    switch (request.method) {
      case "GET": {
        readStreamU.on("data", (chunk) => {
          response.end(chunk);
        });
        break;
      }
      case "POST": {
        request.on("data", (chunkData) => {
        });
        break;
      }
      case "PUT": {
        break;
      }
      case "DELETE": {
        break;
      }
    }
  } else if (request.url === "/posts") {
    switch (request.method) {
      case "GET": {
        readStreamP.on("data", (chunk) => {
          response.end(chunk);
        });
        break;
      }
      case "POST": {
        const writeStreamP = fs.createWriteStream(
          path.join(process.cwd(), "posts.json")
        );
        break;
      }
      case "PUT": {
        break;
      }
      case "DELETE": {
        break;
      }
    }
  } else {
    response.end("Welcome to Homework - route: `/posts` or `/users`");
  }
});

// ! ---- run server ----
server.listen(4000, "0.0.0.0", () => {
  console.log("Server ishga tushdi: http://localhost:4000");
});
