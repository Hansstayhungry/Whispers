import dotenv from 'dotenv';
dotenv.config();
const {ENVIRONMENT, PORT} = process.env;

import express from 'express';
import cors from 'cors';
import uniqid from 'uniqid';
import morgan from 'morgan';

const app = express();

// middleware setup
app.use(morgan(ENVIRONMENT));
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.json({greetings: 'hello world'});
})

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));