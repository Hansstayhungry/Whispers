import express from 'express';
import users from '../db/queries/users';

const router = express.Router();

router.post("/login", async(req, res) => {
  const { email, password } = req.body
  const user = await users.getUserByEmail(email);
})