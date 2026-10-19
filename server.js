const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const requestedPort = Number(process.env.PORT) || 4173;
const host = process.env.HOST || "127.0.0.1";
let port = requestedPort;
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

const server = http.createServer((request, response) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  } catch {
    response.writeHead(400).end("Bad request");
    return;
  }

  const relativePath = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const filePath = path.resolve(root, relativePath);
  if (filePath !== root && !filePath.startsWith(`${root}${path.sep}`)) {
    response.writeHead(403).end("Forbidden");
    return;
  }

  fs.stat(filePath, (statError, stat) => {
    const target = !statError && stat.isDirectory() ? path.join(filePath, "index.html") : filePath;
    fs.readFile(target, (readError, data) => {
      if (readError) {
        response.writeHead(readError.code === "ENOENT" ? 404 : 500, { "Content-Type": "text/plain; charset=utf-8" });
        response.end(readError.code === "ENOENT" ? "Not found" : "Unable to read file");
        return;
      }
      response.writeHead(200, { "Content-Type": types[path.extname(target).toLowerCase()] || "application/octet-stream", "X-Content-Type-Options": "nosniff" });
      response.end(data);
    });
  });
});

server.on("error", error => {
  if (error.code === "EADDRINUSE" && !process.env.PORT && port < requestedPort + 10) {
    port += 1;
    server.listen(port, host);
    return;
  }
  console.error(`Could not start local server on port ${port}: ${error.message}`);
  process.exitCode = 1;
});

server.listen(port, host, () => {
  console.log(`Percy local site: http://localhost:${port}/`);
  console.log(`Percy CRM:        http://localhost:${port}/admin.html`);
  console.log("Press Ctrl+C to stop the local server.");
});
