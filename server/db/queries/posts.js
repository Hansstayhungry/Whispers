// get all diaries

import db from '../../configs/db.config.js';

async function getAllPosts() {
  const diaries = await db.query('SELECT * FROM posts;');
  return diaries.rows;
}

async function getPostById(id) {
  const diary = await db.query('SELECT * FROM posts WHERE id = $1', [id]);
  return diary.rows;
}

async function createPost(title, content, user_id) {
  const newPost = await db.query('INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING *',
  [title, content, user_id]);
  return newPost.rows;
}

async function updatePost(id, title, content) {
  const updatedPost = await db.query('UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *',
  [title, content, id]);
  return updatedPost.rows;
}

async function deletePost(id) {
  const deletedPost = await db.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
  return deletedPost.rows;
}

async function getPostsByUserId(user_id) {
  const userPosts = await db.query('SELECT * FROM posts WHERE user_id = $1', [user_id]);
  return userPosts.rows;
}

export default { getAllPosts, getPostById, createPost, updatePost, deletePost, getPostsByUserId };