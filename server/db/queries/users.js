// db/queries/users.js

import db from '../../configs/db.config.js';

async function getAllUsers() {
  try {
    const users = await db.query('SELECT * FROM users;');
    return users.rows;
  } catch (err) {
    console.log(err);
  }
}

async function getUserById(id) {
  try {
    const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return user.rows;
  } catch (err) {
    console.log(err);
  }         
}

async function getUserByEmail(email) {
  try {
    const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return user.rows;
  } catch (err) {
    console.log(err);
  }
}

async function createUser(username, email, hashedPassword) {
  try {
    await db.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
    [username, email, hashedPassword]);
  } catch (err) {
    console.log(err);
  }
}

export default { getAllUsers, getUserById, getUserByEmail, createUser };