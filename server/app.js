import 'dotenv/config'
const {ENVIRONMENT, PORT} = process.env;

import express from 'express';
import cors from 'cors';
import uniqid from 'uniqid';
import morgan from 'morgan';

import catsRoutes from './routes/catsRoutes.js';
import users from './routes/users.js';

const app = express();

// middleware setup
app.use(morgan(ENVIRONMENT));
app.use(cors());

app.use(express.json());

app.use('/cats', catsRoutes);

//combine since both paths are using users route
app.use('/users', users)

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));