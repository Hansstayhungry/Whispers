import 'dotenv/config'
const {ENVIRONMENT, PORT} = process.env;

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import catsRoutes from './routes/catsRoutes.js';
import users from './routes/users.js';

const app = express();

// middleware setup
app.use(morgan(ENVIRONMENT));
app.use(cors());
app.use(cookieParser());
app.use(session({
  secret: 'couple',
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: 60 * 60 * 24}
}));

app.use(express.json());

app.use('/cats', catsRoutes);

//combine since both paths are using users route
app.use('/users', users)

// check if user is logged in when refresh the home page
app.get("/checkLoggedInUser", (req, res) => {
  console.log("sent")
  if (req.session.user) {
    console.log('user:', req.session.user);
    res.json({ user: req.session.user });
  } else {
    res.json({ user: null});
  }
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));