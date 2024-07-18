import express from 'express';
import { PORT, mongoDBUrl } from './config.js';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import AuthRoute from './routes/auth.js';

dotenv.config();
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(mongoDBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
  return res.status(200).send('Welcome to todo-list-MERN project.');
});

app.use('/api/auth', AuthRoute);
