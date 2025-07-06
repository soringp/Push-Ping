# Node Hello World

Simple node.js app that serves "hello world" with optional Pushover notification support

Great for testing simple deployments to the cloud or sending one-time notifications

## Features

- **HTTP Server Mode**: Lightweight HTTP server with configurable port
- **Pushover Mode**: Send one notification and exit
- Command line parameter support
- Dual functionality: server or notification tool

## Run It

### HTTP Server Mode (Default)

```bash
# Start HTTP server on port 3000
npm start

# Or with custom port
node index.js --port 8080
```

### Pushover Mode (Send notification and exit)

```bash
# Send notification with default message
node index.js --pushping --userkey YOUR_USER_KEY --apikey YOUR_API_KEY

# Send custom notification
node index.js --pushping --userkey YOUR_USER_KEY --apikey YOUR_API_KEY --title "Alert" --message "Something happened"
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

## Modes

### HTTP Server Mode
When run without `--pushping`, the application starts an HTTP server that:
- Serves "Hello Node!" on all requests
- Runs continuously until stopped
- Listens on configurable port (default: 3000)

### Pushover Mode
When run with `--pushping`, the application:
- Sends one notification to Pushover
- Exits immediately after sending
- Does not start HTTP server

## Help

```bash
node index.js --help
```

## Examples

```bash
# HTTP Server Mode
npm start                                    # Start server on port 3000
node index.js --port 8080                   # Start server on port 8080

# Pushover Mode (sends notification and exits)
node index.js --pushping --userkey u123abc --apikey a456def
node index.js --pushping --userkey u123abc --apikey a456def --title "Alert" --message "Task completed"
node index.js --pushping --userkey u123abc --apikey a456def --message "Deployment finished"
```
