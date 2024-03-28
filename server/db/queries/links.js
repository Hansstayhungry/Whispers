import db from '../../configs/db.config.js';

// storge the relations
async function createRelations(inviterId, inviteeId) {
  try {

    // need to save user and both user_id and partner_id for easy fetch info later
    await db.query(
      `INSERT INTO links (user_id, partner_id) 
      VALUES ($1, $2)`,
      [inviterId, inviteeId]);

    await db.query(
      `INSERT INTO links (user_id, partner_id) 
      VALUES ($1, $2)`,
      [inviteeId, inviterId]);

    const newRelation = await db.query(
      `SELECT * 
      FROM links 
      WHERE user_id = $1`,
      [inviteeId]);

    return newRelation.rows;
  } catch (err) {
    console.log(err);
  }
}

// get relations
async function getRelations(id) {
  try {
    const data = await db.query(
      `SELECT * 
      FROM links 
      WHERE user_id = $1`,
      [id]);

    return data.rows;
  } catch (err) {
    console.log(err);
  }
}

export default { getRelations, createRelations };