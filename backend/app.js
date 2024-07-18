import express from 'express';
import { PORT, mongoDBUrl } from './config.js';
import mongoose from 'mongoose';

const app = express();

mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log('Connected to database.');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get('/', (req, res) => {
  console.log(req);
  return res.status(200).send('Welcome to todo-list-MERN project.');
});
