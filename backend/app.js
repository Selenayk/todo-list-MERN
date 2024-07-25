import express from 'express';
import { PORT, mongoDBUrl } from './config.js';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import AuthRouter from './routes/auth.js';
import todoRouter from './routes/todo.js';
import todoItemRouter from './routes/todoItem.js';
import authenticate from './middlewares/authenticate.js';

dotenv.config();
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

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

app.use('/api/auth', AuthRouter);
app.use('/api/todo', authenticate, todoRouter);
app.use('/api/todo', authenticate, todoItemRouter);
