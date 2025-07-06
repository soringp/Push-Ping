# Node Hello World

Simple node.js app that serves "hello world" with optional Pushover notifications

Great for testing simple deployments to the cloud with monitoring capabilities

## Features

- Lightweight HTTP server
- Configurable port
- Optional Pushover notifications for monitoring
- Command line parameter support
- Request counting and milestone notifications

## Run It

### Basic Usage

```bash
npm start
```

### With Pushover Notifications

```bash
node index.js --pushping --userkey YOUR_USER_KEY --apikey YOUR_API_KEY
```

### Custom Configuration

```bash
node index.js --pushping --userkey YOUR_USER_KEY --apikey YOUR_API_KEY --title "My Server" --message "Custom notification" --port 8080
```

## Command Line Options

| Parameter | Description | Required | Example |
|-----------|-------------|----------|---------|
| `--pushping` | Enable pushover notifications | No | `--pushping` |
| `--userkey` | Pushover user key | Yes (with --pushping) | `--userkey abcd1234` |
| `--apikey` | Pushover application API key | Yes (with --pushping) | `--apikey efgh5678` |
| `--title` | Custom notification title | No | `--title "My Server"` |
| `--message` | Custom notification message | No | `--message "Custom alert"` |
| `--port` | Server port | No | `--port 8080` |
| `--help` | Show help message | No | `--help` |

## Pushover Setup

1. Create account at [pushover.net](https://pushover.net/)
2. Get your User Key from the dashboard
3. Create an application to get an API Token
4. Use these keys with the `--userkey` and `--apikey` parameters

## Notification Events

The server sends notifications for:
- Server startup
- Every 10th request (milestone notifications)
- Server shutdown
- Uncaught exceptions

## Help

```bash
node index.js --help
```

## Examples

```bash
# Start server on default port 3000
npm start

# Start with pushover notifications
node index.js --pushping --userkey u123abc --apikey a456def

# Custom port and notifications
node index.js --port 8080 --pushping --userkey u123abc --apikey a456def

# Custom title and message
node index.js --pushping --userkey u123abc --apikey a456def --title "Production Server" --message "Server alert"
```
