import db from '../../configs/db.config.js';

async function getUserById(id) {
  try {
    const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return user.rows;
  } catch (err) {
    console.log(err);
  }         
}