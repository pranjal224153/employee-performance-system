// keep-alive.js - Run this before your exam to keep the server warm
// This pings the backend every 10 minutes so it doesn't sleep on Render free tier

const https = require('https');

const BACKEND_URL = 'https://employee-performance-system-tj4r.onrender.com/';

function pingServer() {
  https.get(BACKEND_URL, (res) => {
    console.log(`[${new Date().toLocaleTimeString()}] Server pinged - Status: ${res.statusCode}`);
  }).on('error', (err) => {
    console.error(`[${new Date().toLocaleTimeString()}] Ping failed:`, err.message);
  });
}

// Ping immediately and then every 10 minutes
pingServer();
setInterval(pingServer, 10 * 60 * 1000);

console.log('Keep-alive started. Server will be pinged every 10 minutes.');
console.log('Keep this running during your examination.');
