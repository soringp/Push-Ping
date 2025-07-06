<<<<<<< HEAD
# Node Hello World - API Documentation

## Overview

This is a dual-purpose Node.js application that can operate in two modes:

1. **HTTP Server Mode**: A simple HTTP server that serves a "Hello World" message
2. **Pushover Mode**: A notification tool that sends one Pushover notification and exits

The application is built using Node.js's built-in `http` module and is designed for testing simple deployments to the cloud or sending one-time notifications.

## Project Structure

```
node-hello/
├── index.js           # Main application entry point
├── package.json       # Project configuration and dependencies
├── package-lock.json  # Dependency lock file
├── README.md          # Basic project information
├── .gitignore         # Git ignore rules
├── .prettierrc        # Code formatting configuration
└── .vscode/           # VS Code configuration
    └── settings.json  # Editor settings
```

## Public APIs and Components

### 1. HTTP Server (`index.js`)

The main component of the application is an HTTP server that responds to all requests with a "Hello Node!" message.

#### Server Configuration

```javascript
const http = require('http');
const port = process.env.PORT || 3000;
```

- **Port**: Configurable via `PORT` environment variable, defaults to `3000`
- **Protocol**: HTTP (not HTTPS)
- **Dependencies**: Node.js built-in `http` module

#### Server Instance

```javascript
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  const msg = 'Hello Node!\n'
  res.end(msg);
});
```

**Function Signature**: `http.createServer(requestListener)`

**Parameters**:
- `req` (http.IncomingMessage): The HTTP request object
- `res` (http.ServerResponse): The HTTP response object

**Response**:
- **Status Code**: 200 (OK)
- **Content-Type**: Plain text (default)
- **Body**: "Hello Node!\n"

#### Server Startup

```javascript
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
```

**Function Signature**: `server.listen(port, callback)`

**Parameters**:
- `port` (number): The port number to listen on
- `callback` (function): Callback function executed when server starts

## API Endpoints

### GET / (Root Endpoint)

**Description**: Returns a simple "Hello Node!" message

**HTTP Method**: GET (responds to all HTTP methods)

**URL**: `http://localhost:3000/` (or configured port)

**Request Parameters**: None

**Response**:
```
Status: 200 OK
Content-Type: text/plain
Body: Hello Node!
```

**Example Request**:
```bash
curl http://localhost:3000/
```

**Example Response**:
```
Hello Node!
```

### All Other Endpoints

**Description**: The server responds to all paths with the same "Hello Node!" message

**HTTP Method**: Any (GET, POST, PUT, DELETE, etc.)

**URL**: `http://localhost:3000/*` (any path)

**Response**: Same as root endpoint

**Example Requests**:
```bash
curl http://localhost:3000/api/users
curl -X POST http://localhost:3000/login
curl -X PUT http://localhost:3000/data/123
```

All return the same "Hello Node!" response.

## Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Port number for the server to listen on | `3000` | No |

### Package.json Configuration

```json
{
  "name": "node-hello",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  }
}
```

**Key Properties**:
- **name**: `node-hello` - Package name
- **version**: `1.0.0` - Semantic version
- **main**: `index.js` - Entry point
- **scripts.start**: `node index.js` - Start command
- **scripts.notify**: `node index.js --pushping --userkey YOUR_USER_KEY --apikey YOUR_API_KEY` - Send notification
- **scripts.help**: `node index.js --help` - Show help message

## Application Modes

### HTTP Server Mode (Default)

When run without the `--pushping` parameter, the application operates as a continuous HTTP server:

- Serves "Hello Node!" response to all HTTP requests
- Runs continuously until manually stopped
- Listens on configurable port (default: 3000)

### Pushover Mode

When run with the `--pushping` parameter, the application operates as a one-time notification tool:

- Sends a single notification to Pushover
- Exits immediately after sending the notification
- Does not start the HTTP server
- Useful for scripts, cron jobs, or one-time alerts

### Command Line Parameters

| Parameter | Description | Required | Example |
|-----------|-------------|----------|---------|
| `--pushping` | Enable pushover notifications | No | `--pushping` |
| `--userkey` | Pushover user key | Yes (with --pushping) | `--userkey abcd1234` |
| `--apikey` | Pushover application API key | Yes (with --pushping) | `--apikey efgh5678` |
| `--title` | Custom notification title | No | `--title "My Server"` |
| `--message` | Custom notification message | No | `--message "Custom alert"` |
| `--port` | Server port | No | `--port 8080` |
| `--help` | Show help message | No | `--help` |

### Pushover Configuration

To use Pushover notifications, you need:

1. **Pushover Account**: Sign up at https://pushover.net/
2. **User Key**: Found in your Pushover dashboard
3. **API Token**: Create an application at https://pushover.net/apps/build

### Pushover Notification Behavior

When running in Pushover mode, the application:

1. **Parses command line arguments**
2. **Validates required parameters** (userkey and apikey)
3. **Sends one notification** with the specified or default message
4. **Exits immediately** after notification is sent

#### Default Notification
- **Default Title**: "Node Hello Server"
- **Default Message**: "Node Hello application notification"

#### Message Priority
The notification content is determined in this order:
1. **Custom message** (if `--message` parameter is provided)
2. **Default message** ("Node Hello application notification")

#### Title Priority
The notification title is determined in this order:
1. **Custom title** (if `--title` parameter is provided)
2. **Default title** ("Node Hello Server")

### Custom Notifications

You can customize the notification content using command line parameters:

- **Custom Title**: Use `--title "Your Title"` to set a custom notification title
- **Custom Message**: Use `--message "Your Message"` to set a custom notification message

**Examples**:
```bash
# Default notification
node index.js --pushping --userkey your_user_key --apikey your_api_key

# Custom title only
node index.js --pushping --userkey your_user_key --apikey your_api_key --title "Production Alert"

# Custom message only
node index.js --pushping --userkey your_user_key --apikey your_api_key --message "Deployment completed successfully"

# Custom title and message
node index.js --pushping --userkey your_user_key --apikey your_api_key --title "Deploy Status" --message "Application deployed to production"
```

## Usage Examples

### HTTP Server Mode

#### Basic HTTP Server

1. **Start the server**:
```bash
npm start
```

2. **Access the server**:
```bash
curl http://localhost:3000/
```

3. **Expected output**:
```
Hello Node!
```

#### Custom Port

```bash
node index.js --port 8080
```

#### Production Deployment

```bash
# Set production port via environment variable
export PORT=80
npm start

# Or via command line
node index.js --port 80
```

#### Using with PM2

```bash
# Install PM2
npm install -g pm2

# Start with PM2
pm2 start index.js --name "node-hello"

# Monitor
pm2 monit
```

#### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### Pushover Mode

#### Basic Notification

```bash
node index.js --pushping --userkey YOUR_USER_KEY --apikey YOUR_API_KEY
```

**Expected output**:
```
Sending pushover notification...
Pushover notification sent successfully
Notification sent. Exiting...
```

#### Custom Notifications

```bash
# Custom message
node index.js --pushping --userkey YOUR_USER_KEY --apikey YOUR_API_KEY --message "Build completed successfully"

# Custom title
node index.js --pushping --userkey YOUR_USER_KEY --apikey YOUR_API_KEY --title "CI/CD Pipeline"

# Both custom title and message
node index.js --pushping --userkey YOUR_USER_KEY --apikey YOUR_API_KEY --title "Deployment Alert" --message "Application deployed to production"
```

#### Use in Scripts

```bash
#!/bin/bash
# deploy.sh

echo "Starting deployment..."
# ... deployment commands ...

if [ $? -eq 0 ]; then
    node index.js --pushping --userkey $PUSHOVER_USER --apikey $PUSHOVER_API --title "Deployment Success" --message "Application deployed successfully"
else
    node index.js --pushping --userkey $PUSHOVER_USER --apikey $PUSHOVER_API --title "Deployment Failed" --message "Deployment encountered errors"
fi
```

#### Use in Cron Jobs

```bash
# Add to crontab for daily health check notification
0 9 * * * /usr/bin/node /path/to/index.js --pushping --userkey YOUR_USER_KEY --apikey YOUR_API_KEY --title "Daily Health Check" --message "System is running normally"
```

## Error Handling

The current implementation does not include explicit error handling. The server will:

- Return `200 OK` for all requests
- Not handle server errors explicitly
- Rely on Node.js default error handling

### Recommendations for Production

```javascript
// Enhanced error handling example
const server = http.createServer((req, res) => {
  try {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    const msg = 'Hello Node!\n';
    res.end(msg);
  } catch (error) {
    console.error('Server error:', error);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
});

// Handle server errors
server.on('error', (error) => {
  console.error('Server error:', error);
});
```

## Performance Considerations

### Current Implementation

- **Single-threaded**: Uses Node.js event loop
- **No caching**: Generates response for each request
- **No compression**: Serves plain text without compression
- **No rate limiting**: Accepts unlimited requests

### Optimization Recommendations

1. **Add compression**:
```javascript
const zlib = require('zlib');
// Add gzip compression for responses
```

2. **Add caching headers**:
```javascript
res.setHeader('Cache-Control', 'public, max-age=3600');
```

3. **Add rate limiting**:
```javascript
// Use express-rate-limit or similar
```

## Testing

### Manual Testing

```bash
# Test basic functionality
curl http://localhost:3000/

# Test different HTTP methods
curl -X POST http://localhost:3000/
curl -X PUT http://localhost:3000/api/test
curl -X DELETE http://localhost:3000/users/1
```

### Load Testing

```bash
# Using curl for basic load testing
for i in {1..100}; do curl http://localhost:3000/ & done

# Using Apache Bench (ab)
ab -n 1000 -c 10 http://localhost:3000/
```

### Integration Testing Example

```javascript
// test.js
const http = require('http');
const assert = require('assert');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET'
};

const req = http.request(options, (res) => {
  assert.strictEqual(res.statusCode, 200);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    assert.strictEqual(data, 'Hello Node!\n');
    console.log('Test passed!');
  });
});

req.on('error', (error) => {
  console.error('Test failed:', error);
});

req.end();
```

## Deployment

### Local Development

```bash
# Install dependencies (none in this case)
npm install

# Start development server
npm start

# Server will be available at http://localhost:3000/
```

### Production Deployment

#### AWS EC2

```bash
# Transfer files to EC2 instance
scp -r . ec2-user@your-instance:/home/ec2-user/node-hello

# SSH into instance
ssh ec2-user@your-instance

# Install Node.js and start application
sudo yum update -y
sudo yum install -y nodejs npm
cd node-hello
npm start
```

#### Heroku

```bash
# Create Heroku app
heroku create your-app-name

# Deploy
git push heroku main
```

#### Docker

```bash
# Build image
docker build -t node-hello .

# Run container
docker run -p 3000:3000 node-hello
```

## Security Considerations

### Current Security Status

- **No authentication**: Open to all requests
- **No input validation**: Accepts all requests without validation
- **No HTTPS**: Uses HTTP only
- **No security headers**: Missing security headers

### Security Recommendations

1. **Add HTTPS**:
```javascript
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('certificate.pem')
};

const server = https.createServer(options, (req, res) => {
  // ... handler code
});
```

2. **Add security headers**:
```javascript
res.setHeader('X-Content-Type-Options', 'nosniff');
res.setHeader('X-Frame-Options', 'DENY');
res.setHeader('X-XSS-Protection', '1; mode=block');
```

3. **Add rate limiting and input validation for production use**

## Contributing

### Code Style

The project uses Prettier for code formatting with the following configuration:

```json
{
  "singleQuote": true,
  "semi": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

### Development Workflow

1. Make changes to `index.js`
2. Test locally with `npm start`
3. Format code with `npx prettier --write .`
4. Commit changes

## License

ISC License (as specified in package.json)

## Support

For issues and questions, please refer to the GitHub repository:
- **Repository**: https://github.com/johnpapa/node-hello
- **Issues**: https://github.com/johnpapa/node-hello/issues

---

*This documentation covers all public APIs, functions, and components of the Node Hello World application. The application is intentionally simple and serves as a foundation for more complex Node.js applications.*
=======
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
>>>>>>> origin/cursor/generate-documentation-for-public-apis-87fc
