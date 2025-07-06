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

Options:
  --pushping              Enable pushover notifications
  --userkey <key>         Pushover user key (required with --pushping)
  --apikey <key>          Pushover API key (required with --pushping)
  --title <title>         Custom title for notifications (optional)
  --message <message>     Custom message for notifications (optional)
  --port <port>           Port to run server on (default: 3000)
  --help                  Show this help message

Examples:
  node index.js --pushping --userkey YOUR_USER_KEY --apikey YOUR_API_KEY
  node index.js --pushping --userkey YOUR_USER_KEY --apikey YOUR_API_KEY --title "My Server" --message "Custom notification"
  node index.js --port 8080
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
function sendPushoverNotification(message, title = null) {
  if (!config.pushping) return;

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
    });
  });

  req.on('error', (error) => {
    console.error('Error sending pushover notification:', error);
  });

  req.write(postData);
  req.end();
}

// Request counter for notifications
let requestCount = 0;

const server = http.createServer((req, res) => {
  requestCount++;
  
  res.statusCode = 200;
  const msg = 'Hello Node!\n';
  res.end(msg);
  
  // Send pushover notification for every 10th request
  if (config.pushping && requestCount % 10 === 0) {
    sendPushoverNotification(
      `Server has received ${requestCount} requests. Latest request: ${req.method} ${req.url}`,
      'Node Hello Server - Request Milestone'
    );
  }
});

server.listen(config.port, () => {
  const startMessage = `Server running on http://localhost:${config.port}/`;
  console.log(startMessage);
  
  // Send pushover notification when server starts
  if (config.pushping) {
    sendPushoverNotification(
      `Node Hello server started successfully on port ${config.port}`,
      'Node Hello Server - Started'
    );
  }
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  
  if (config.pushping) {
    sendPushoverNotification(
      `Node Hello server shutting down. Total requests served: ${requestCount}`,
      'Node Hello Server - Shutdown'
    );
  }
  
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  
  if (config.pushping) {
    sendPushoverNotification(
      `Node Hello server encountered an error: ${error.message}`,
      'Node Hello Server - Error'
    );
  }
  
  process.exit(1);
});
