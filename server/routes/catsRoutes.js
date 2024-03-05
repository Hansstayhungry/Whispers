/////////// catsRoutes.js
import express from 'express';
import users from '../db/queries/users.js';

const router = express.Router();

router.get('/', (req, res) => {
  users.getAllUsers().then(data => {
    console.log(data);
    res.json({users: data});
  })
});
  

export default router;
