const userRouter = require('./user/user.routes');

const express = require('express');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  const start = Date.now();

  next();
  const delta = Date.now() - start;

  res.on('finish', () =>
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${delta}ms`)
  );
});

app.use('/users', userRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    info: 'The server is running...',
  });
});

module.exports = app;
