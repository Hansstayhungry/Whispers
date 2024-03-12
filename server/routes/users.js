import express from 'express';
import users from '../db/queries/users.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post("/signup", async(req, res) => {

  // getting data from cleint side
  const { name, email, password } = req.body
  
  //hash password
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hashSync(password, saltRounds);

    await users.createUser(name, email, hashedPassword);

    res.status(201).json({ message: 'User registered successfully'});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error'});
  }
});

router.post("/login", async(req, res) => {

  const { email, password } = req.body

  try {
    const user = await users.getUserByEmail(email);
    const userHashedPassword = user[0].password;

    const match = await bcrypt.compare(password, userHashedPassword);

    if (match) {
      res.json({ message: 'login successful' });
    } else {
      res.json({ message: 'invalid email or password' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error'});
  }
});

export default router;