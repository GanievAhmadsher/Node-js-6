import http from "node:http";
import fs from "node:fs";
import path, { parse } from "node:path";
import { Transform } from "node:stream";
// ? Data
const readStreamU = fs.createReadStream(path.join(process.cwd(), "users.json"));

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
          const transform = new Transform({
            transform: function (chunk, encoding, callbackFn) {
              callbackFn(
                null,
                (() => {
                  fs.unlink(
                    path.join(process.cwd(), "users.json"),
                    (err, data) => {}
                  );
                  return JSON.stringify([
                    ...JSON.parse(chunk),
                    ...JSON.parse(chunkData),
                  ]);
                })()
              );
            },
          });

          const writeStreamU = fs.createWriteStream(
            path.join(process.cwd(), "users.json")
          );

          readStreamU.pipe(transform).pipe(writeStreamU);
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
