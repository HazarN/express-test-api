require('dotenv').config();

const http = require('http');
const app = require('./src/app');

const PORT = process.env.PORT || 5000;

// implement app.js and use it there
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
