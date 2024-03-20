import express from 'express';
import users from '../db/queries/users.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post("/signup", async(req, res) => {

  // getting data from cleint side
  const { username, email, password } = req.body
  
  try {
    // check if email exists in database
    const user = await users.getUserByEmail(email);

    if (user[0]) {
      res.status(409).json({ message: 'account already exists' })
      return;
    } else {
      //hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hashSync(password, saltRounds);

      const newUser = await users.createUser(username, email, hashedPassword);
      // set session data
      req.session.user = {
        id: newUser[0].id,
        username: newUser[0].username,
        email: newUser[0].email
      }

      res.json({ isLogin: true, userInfo: req.session.user, message: 'User registered successfully'});      
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error'});
  }
});

router.post("/login", async(req, res) => {

  const { email, password } = req.body

  try {
    const user = await users.getUserByEmail(email);

    // If no user found with the given email
    if (!user || user.length === 0) {
      return res.json({ error: 'Invalid email or password' });
    }
    const userHashedPassword = user[0].password;
    const userId = user[0].id;
    const username = user[0].username;
    const useremail = user[0].email;

    const match = await bcrypt.compare(password, userHashedPassword);

    // sending extra match data for tracking incorrect password error
    if (match) {
      // set session data
      req.session.user = {
        id: userId,
        username: username,
        email: useremail
      }
      console.log('user logged in:', req.session.user);
      res.json({ isLogin: true, userInfo: req.session.user, message: 'login successful' });
    } else {
      res.json({ message: 'invalid email or password' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error'});
  }
});

// check if user is logged in when refresh the home page
router.get("/checkLoggedInUser", (req, res) => {
  console.log("sent")
  if (req.session.user) {
    console.log('user:', req.session.user);
    res.json({ user: req.session.user });
  } else {
    res.json({ user: null});
  }
});

// clear cookies and session data when user logs out
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: 'logout successful' });
});

export default router;