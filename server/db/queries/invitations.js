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

async function createLink(inviterId, inviteeId, code) {
  try {
    await db.query('INSERT INTO invitations (inviter, invitee, code) VALUES ($1, $2, $3)',
    [inviterId, inviteeId, code]);

    const newLink = await db.query('SELECT * FROM invitations WHERE code = $1', [code]);
    return newLink.rows;
    
  } catch (err) {
    console.log(err);
  }
}

async function getMatchByCode(email) {
  try {
    const data = await db.query('SELECT * FROM invitations WHERE code = $1', [code]);
    return data.rows;
  } catch (err) {
    console.log(err);
  }
}

export default { getAllUsers, getUserById, getUserByEmail, createLink, getMatchByCode };