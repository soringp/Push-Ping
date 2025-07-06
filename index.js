const http = require('http');
const https = require('https');
const querystring = require('querystring');

// Parse command line arguments
const args = process.argv.slice(2);
const config = {
  port: process.env.PORT || 3000,
  pushping: false,
  userkey: null,
  apikey: null,
  title: 'Node Hello Server',
  message: null
};

// Parse command line arguments
for (let i = 0; i < args.length; i++) {
  switch (args[i]) {
    case '--pushping':
      config.pushping = true;
      break;
    case '--userkey':
      config.userkey = args[i + 1];
      i++; // Skip next argument as it's the value
      break;
    case '--apikey':
      config.apikey = args[i + 1];
      i++; // Skip next argument as it's the value
      break;
    case '--title':
      config.title = args[i + 1];
      i++; // Skip next argument as it's the value
      break;
    case '--message':
      config.message = args[i + 1];
      i++; // Skip next argument as it's the value
      break;
    case '--port':
      config.port = parseInt(args[i + 1]);
      i++; // Skip next argument as it's the value
      break;
  }
}

// Function to show help
function showHelp() {
  console.log(`
Usage: node index.js [options]

Modes:
  HTTP Server Mode (default): Runs a continuous HTTP server
  Pushover Mode: Sends one notification and exits

Options:
  --pushping              Enable pushover mode (sends one notification and exits)
  --userkey <key>         Pushover user key (required with --pushping)
  --apikey <key>          Pushover API key (required with --pushping)
  --title <title>         Custom title for notification (optional)
  --message <message>     Custom message for notification (optional)
  --port <port>           Port to run server on (default: 3000, ignored in pushover mode)
  --help                  Show this help message

Examples:
  # Run HTTP server
  node index.js
  node index.js --port 8080
  
  # Send pushover notification and exit
  node index.js --pushping --userkey YOUR_USER_KEY --apikey YOUR_API_KEY
  node index.js --pushping --userkey YOUR_USER_KEY --apikey YOUR_API_KEY --title "Alert" --message "Something happened"
`);
}

// Check for help flag
if (args.includes('--help') || args.includes('-h')) {
  showHelp();
  process.exit(0);
}

// Validate pushover configuration
if (config.pushping && (!config.userkey || !config.apikey)) {
  console.error('Error: --pushping requires both --userkey and --apikey parameters');
  console.error('Use --help for usage information');
  process.exit(1);
}

// Function to send pushover notification
function sendPushoverNotification(message, title = null, callback = null) {
  if (!config.pushping) {
    if (callback) callback();
    return;
  }

  // Use custom message if provided, otherwise use the passed message
  const finalMessage = config.message || message;
  // Use custom title if provided, otherwise use the passed title or default
  const finalTitle = title || config.title;

  const postData = querystring.stringify({
    token: config.apikey,
    user: config.userkey,
    message: finalMessage,
    title: finalTitle
  });

  const options = {
    hostname: 'api.pushover.net',
    port: 443,
    path: '/1/messages.json',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      if (res.statusCode === 200) {
        console.log('Pushover notification sent successfully');
      } else {
        console.error('Failed to send pushover notification:', res.statusCode, data);
      }
      if (callback) callback();
    });
  });

  req.on('error', (error) => {
    console.error('Error sending pushover notification:', error);
    if (callback) callback();
  });

  req.write(postData);
  req.end();
}

// If pushover is enabled, just send notification and exit
if (config.pushping) {
  console.log('Sending pushover notification...');
  
  // Use custom message or default message
  const notificationMessage = config.message || 'Node Hello application notification';
  
  sendPushoverNotification(notificationMessage, config.title, () => {
    console.log('Notification sent. Exiting...');
    process.exit(0);
  });
} else {
  // Run as HTTP server if pushover is not enabled
  let requestCount = 0;

  const server = http.createServer((req, res) => {
    requestCount++;
    
    res.statusCode = 200;
    const msg = 'Hello Node!\n';
    res.end(msg);
  });

  server.listen(config.port, () => {
    const startMessage = `Server running on http://localhost:${config.port}/`;
    console.log(startMessage);
  });

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\nShutting down server...');
    
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
  });
}
