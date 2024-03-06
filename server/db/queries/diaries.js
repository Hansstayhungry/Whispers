// get all diaries

import db from '../../configs/db.config.js';

async function getAllDiaries() {
  const diaries = await db.query('SELECT * FROM diaries;');
  return diaries.rows;
}