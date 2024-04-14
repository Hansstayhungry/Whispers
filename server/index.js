import 'dotenv/config'
const {ENVIRONMENT, PORT} = process.env;

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import users from './routes/users.js';
import posts from './routes/posts.js';
import invitations from './routes/invitations.js';
import links from './routes/links.js';

const app = express();

// middleware setup
app.use(morgan(ENVIRONMENT));

// proudction
app.use(cors(
  {origin: "https://whispers-f1v1.onrender.com"}
));

// development
// app.use(cors(
//   {origin: "http://localhost:3000",}
// ));
app.use(cookieParser());
app.use(session({
  secret: 'couple',
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: 60 * 60 * 24 * 1000}
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//combine since both paths are using users route
app.use('/users', users);

//handle posts routes
app.use('/posts', posts);

//handle two user links
app.use('/invitations', invitations);

//handle link relations route
app.use('/links', links);

// testing if setup successfully
app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));