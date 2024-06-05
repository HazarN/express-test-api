const userRouter = require('./user/user.routes');

const express = require('express');
const app = express();

// enforce the use of json in the request body
app.use(express.json());
// log the request method, original URL, status code, and response time
app.use((req, res, next) => {
  const start = Date.now();

  next();
  const delta = Date.now() - start;

  res.on('finish', () =>
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${delta}ms`)
  );
});

app.use('/users', userRouter);

// Deafult route to check if the server is running
app.get('/', (req, res) => {
  res.status(200).json({
    info: 'The server is running...',
  });
});

module.exports = app;
