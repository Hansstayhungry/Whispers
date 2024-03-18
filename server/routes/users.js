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
      //set cookies session here
      res.cookie('user', newUser[0].id,
      { maxAge: 1 * 24 * 60 * 1000, // 1 day expiration;
        httpOnly: true,
        sameSite: 'none',
        secure: true
      });


      const newUsername = newUser[0].username;
      const newUseremail = newUser[0].email;

      const userInfo = {
        username: newUsername,
        email: newUseremail
      }

      res.json({ userInfo: userInfo, message: 'User registered successfully'});      
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
      return res.json({ match: false, error: 'Invalid email or password' });
    }
    const userHashedPassword = user[0].password;
    const username = user[0].username;
    const useremail = user[0].email;

    const userInfo = {
      username: username,
      email: useremail
    }

    const match = await bcrypt.compare(password, userHashedPassword);

    // sending extra match data for tracking incorrect password error
    if (match) {
      res.cookie('userData', user[0].id,
      { maxAge: 1 * 24 * 60 * 1000, // 1 day expiration;
        httpOnly: true,
        sameSite: 'none',
        secure: true
      });
      res.json({ userInfo: userInfo, match: true, message: 'login successful' });
    } else {
      res.json({ match: false, message: 'invalid email or password' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error'});
  }
});

export default router;