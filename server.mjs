import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import http from "node:http";
import { dirname, join } from "node:path";
import querystring from "node:querystring";

import { diskKV } from "./node_modules/@tagmein/civil-memory/dist/kv/diskKV.js";
import { httpKV } from "./node_modules/@tagmein/civil-memory/dist/kv/httpKV.js";
import { volatileKV } from "./node_modules/@tagmein/civil-memory/dist/kv/volatileKV.js";
import { collectRequestBody } from "./collectRequestBody.mjs";

const ModeOptionsDiskBasePathParamName = "modeOptions.disk.basePath";

const modeDisk = diskKV.name?.replace("KV", "");
const modeHttp = httpKV.name?.replace("KV", "");
const modeVolatile = volatileKV.name?.replace("KV", "");

const DEFAULT_PORT = 8001;

const BASE_DIR = dirname(import.meta.url).replace("file://", "");

const STORAGE_DIR = join(BASE_DIR, ".tmp-kv");

async function main() {
  const indexHtml = (await readFile(join(BASE_DIR, "index.html"))).toString(
    "utf-8"
  );
  const faviconIco = await readFile(join(BASE_DIR, "favicon.ico"));
  const portEnv = parseInt(process.env.PORT, 10);
  const port =
    Number.isFinite(portEnv) && portEnv >= 1 && portEnv < 65536
      ? portEnv
      : DEFAULT_PORT;

  const volatileStore = volatileKV();

  function getKVByMode(mode = "disk", params) {
    switch (mode) {
      case "disk":
        return diskKV({
          rootDir:
            ModeOptionsDiskBasePathParamName in params
              ? params[ModeOptionsDiskBasePathParamName]
              : STORAGE_DIR,
          fsPromises: { mkdir, readFile, unlink, writeFile },
          path: { join },
        });
      case "http":
        const httpUrl = params.url;
        if (typeof httpUrl !== "string") {
          const err = new Error(
            `parameter url must be specified for 'http' mode`
          );
          err.statusCode = 400;
          throw err;
        }
        return httpKV({ baseUrl: httpUrl });
      case "volatile":
        return volatileStore;
      default:
        const err = new Error(
          "parameter mode must be one of: cloudflare, disk, http, vercel, volatile"
        );
        err.statusCode = 400;
        throw err;
    }
  }

  function setCorsHeaders(request, response) {
    const requestOrigin = request.headers.origin;
    const allowedOrigin =
      requestOrigin && requestOrigin.startsWith("http://localhost")
        ? requestOrigin
        : "http://localhost:9090";

    response.setHeader("Access-Control-Allow-Origin", allowedOrigin);
    response.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, DELETE, OPTIONS"
    );
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }

  const httpServer = http.createServer(async function (request, response) {
    try {
      setCorsHeaders(request, response);

      if (request.method === "OPTIONS") {
        response.statusCode = 204;
        response.end();
        return;
      }

      const [requestPath, requestParamString] = request.url.split("?");
      const requestParams = querystring.parse(requestParamString ?? "");
      console.log(request.method, requestPath, JSON.stringify(requestParams));
      switch (request.method) {
        case "DELETE": {
          const kv = getKVByMode(requestParams.mode, requestParams);
          if (typeof requestParams.key !== "string") {
            response.statusCode = 400;
            response.end(
              JSON.stringify({ error: "request parameter key missing" })
            );
            return;
          }
          await kv.delete(requestParams.key);
          response.statusCode = 200;
          response.end();
          return;
        }
        case "GET": {
          if (request.url === "/") {
            response.statusCode = 200;
            response.end(indexHtml);
            return;
          }
          if (request.url === "/favicon.ico") {
            response.statusCode = 200;
            response.setHeader("Content-Type", "image/x-icon");
            response.end(faviconIco);
            return;
          }
          const isJs = request.url.endsWith(".js");
          if (isJs || request.url.endsWith(".css")) {
            response.statusCode = 200;
            response.setHeader(
              "Content-Type",
              isJs ? "application/javascript" : "text/css"
            );
            console.log("respond with file: " + join(BASE_DIR, request.url));
            try {
              response.end(await readFile(join(BASE_DIR, request.url)));
              return;
            } catch (e) {}
          }
          // console.log(JSON.stringify({ url: request.url }));
          const pathKey = request.url.split("?")[0].substring(1);
          const kv = getKVByMode(requestParams.mode, requestParams);
          async function keys() {
            const index = await kv.get("!explore.index");
            try {
              return typeof index === "string" && index.length > 0
                ? JSON.parse(index)
                : [];
            } catch (e) {
              console.error(e);
              return ["Error"];
            }
          }
          if (pathKey.length > 0) {
            console.dir(`GET ${JSON.stringify(pathKey)}`);
            const isCss = pathKey.endsWith(".css");
            const isHtml = pathKey.endsWith(".html");
            const isJs = pathKey.endsWith(".js");
            const isJson = pathKey.endsWith(".json");
            response.setHeader(
              "Content-Type",
              isJson
                ? "application/json"
                : isJs
                ? "application/javascript"
                : isHtml
                ? "text/html"
                : isCss
                ? "text/css"
                : "text/plain"
            );
            response.statusCode = 200;
            const index = await keys();
            const value = await kv.get(pathKey);
            if (typeof value === "string") {
              // ensure this entry is in the index
              if (!index.includes(pathKey)) {
                await kv.set(
                  "!explore.index",
                  JSON.stringify([...index, pathKey])
                );
              }
            } else if (index.includes(pathKey)) {
              // remove this entry from the index
              await kv.set(
                "!explore.index",
                JSON.stringify(index.filter((x) => x !== pathKey))
              );
            }
            response.end(value ?? "");
            return;
          }
          if (typeof requestParams.key !== "string") {
            response.statusCode = 400;
            response.end(
              JSON.stringify({ error: "request parameter key missing" })
            );
            return;
          }
          response.statusCode = 200;
          response.end((await kv.get(requestParams.key)) ?? "");
          return;
        }
        case "POST": {
          const kv = getKVByMode(requestParams.mode, requestParams);
          if (typeof requestParams.key !== "string") {
            response.statusCode = 400;
            response.end(
              JSON.stringify({ error: "request parameter key missing" })
            );
            return;
          }
          const requestBody = await collectRequestBody(request);
          await kv.set(requestParams.key, requestBody);
          response.statusCode = 200;
          response.end();
          return;
        }
        default: {
          response.statusCode = 405;
          response.end("invalid method");
          return;
        }
      }
    } catch (e) {
      console.error(e);
      response.statusCode = e.statusCode ?? 500;
      response.setHeader("Content-Type", "text/plain; charset=utf-8");
      response.end(e.message);
    }
  });

  httpServer.listen(port, "localhost", function () {
    console.log(
      `Server running (and test suite ready) at http://localhost:${port}

Example URL parameters:

 • ?mode=disk&${ModeOptionsDiskBasePathParamName}=./my-kv-store // disk-based key-value store in ./my-kv-store
 • ?mode=volatile // volatile in-memory key-value store
 • ?mode=http&url=http://localhost:3636 // forwards requests to another Civil Memory compatible kv server

Valid values for the mode URL parameter:
 • ?mode=${modeDisk}
 • ?mode=${modeHttp}
 • ?mode=${modeVolatile}

All API operations:

 • Read value at key
   GET ?mode=${modeDisk}&${ModeOptionsDiskBasePathParamName}=./my-kv-store&key=urlEncodedKey

   The GET request will return the value of the key, which is sent as the response body.

 • Delete value at key
   DELETE ?mode=${modeDisk}&${ModeOptionsDiskBasePathParamName}=./my-kv-store&key=urlEncodedKey

   The DELETE request will delete the value of the key.

 • Write value at key
   POST ?mode=${modeDisk}&${ModeOptionsDiskBasePathParamName}=./my-kv-store&key=urlEncodedKey [ POST body ]
   
   Where [ POST body ] is the value to be stored at the key, which is sent as the body of the POST request.`
    );
  });
}

main().catch(async function (e) {
  console.error(e);
  const errorFilePath = join(STORAGE_DIR, ".civil-memory-kv-error.txt");
  await writeFile(errorFilePath, e.stack);
  console.log(`Error details written to ${errorFilePath}`);
  process.exitCode = 1;
});
