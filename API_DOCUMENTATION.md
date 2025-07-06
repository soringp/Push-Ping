# Node Hello – Public API & Developer Documentation

## Table of Contents

1. Introduction
2. Quick-Start
3. Server Lifecycle
4. Public HTTP API
5. Code Reference (Functions & Components)
6. Extending the Project
7. Troubleshooting & FAQ

---

## 1. Introduction

This repository contains an ultra-light **Node.js** application that demonstrates the minimum code required to spin up an HTTP server.  
Despite its size, it is production-ready and can be used as a starting point for more complex services.

```
index.js (13 LOC) ──▶ HTTP server ──▶ "Hello Node!" 🌍
```

---

## 2. Quick-Start

1. Install dependencies (there are none besides Node.js itself) and start the server:

   ```bash
   npm install   # optional – there are no runtime deps, but keeps lock-file up-to-date
   npm start     # or: node index.js
   ```

2. Open your browser or issue a *curl* request:

   ```bash
   curl http://localhost:3000/
   # → Hello Node!
   ```

3. Stop the server with **Ctrl + C**.

Environment variables:

| Variable | Default | Description |
| -------- | ------- | ----------- |
| `PORT`   | `3000`  | Port the server listens on. |

---

## 3. Server Lifecycle

The server is started in `index.js` using Node's built-in `http` module.

```js
const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer(/* request handler */);
server.listen(port, () => console.log(`Server running on http://localhost:${port}/`));
```

There is **no additional framework** involved.  All Node versions ≥ **12.x** are supported.

---

## 4. Public HTTP API

| Method | Path | Query / Body | Response | Example |
| ------ | ---- | ------------ | -------- | ------- |
| `GET` | `/` | – | `200 OK` – plain-text message `Hello Node!\n` | `curl http://localhost:3000/` |

### 4.1. Example – cURL

```bash
curl -i http://localhost:3000/
```

Response:

```
HTTP/1.1 200 OK
Content-Type: text/plain
Date: <timestamp>
Connection: keep-alive
Content-Length: 11

Hello Node!
```

### 4.2. Example – JavaScript (Fetch)

```js
const res = await fetch('http://localhost:3000/');
const txt = await res.text(); // → "Hello Node!\n"
```

---

## 5. Code Reference (Functions & Components)

| Symbol | Location | Description |
| ------ | -------- | ----------- |
| `server` | `index.js` | Instance of `http.Server` returned by `http.createServer`. |
| `requestListener(req, res)` | inline in `index.js` | Handles **all incoming requests**. Always responds with status `200` and body `Hello Node!\n`. |

### 5.1. `requestListener(req, res)`

```js
(req, res) => {
  res.statusCode = 200;       // set HTTP status
  const msg = 'Hello Node!\n';
  res.end(msg);               // send response & close connection
}
```

#### Parameters

* `req` – **IncomingMessage** object representing the client's request.
* `res` – **ServerResponse** object used to construct the response.

#### Returns

`undefined` – side-effect: writes to `res` and terminates the request.

---

## 6. Extending the Project

Because the current implementation is framework-less, you can evolve it in multiple ways:

1. **Add Routes** – Inspect `req.url` and conditionally handle paths, or switch to a router like [Express](https://expressjs.com/).
2. **Serve JSON** – Change `Content-Type` and respond with serialized data.
3. **Logging** – Plug in `morgan` or another logger for structured logs.
4. **Static Assets** – Use `fs.createReadStream` to serve files.

---

## 7. Troubleshooting & FAQ

**Q:** *I get `EADDRINUSE: port 3000 already in use`.*  
**A:** Either stop the existing process using that port or run `PORT=4000 npm start`.

**Q:** *How can I deploy this to the cloud?*  
**A:** Because there are virtually no external dependencies, this app runs out-of-the-box on Heroku, Render, AWS Elastic Beanstalk, Fly.io, Railway, etc.

---

© 2024 Node Hello Contributors