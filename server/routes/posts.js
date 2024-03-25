import express from "express";
import posts from "../db/queries/posts.js";

const router = express.Router();

// get all posts
router.get('/', async (req, res) => {
  try {
    const allPosts = await posts.getAllPosts();
    res.json(allPosts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get a single post by post id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await posts.getPostById(id);
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// create a new post
router.post('/create', async (req, res) => {
  const { title, content, user_id } = req.body;
  try {
    const newPost = await posts.createPost(title, content, user_id);
    res.json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// update a post
router.post('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatedPost = await posts.updatePost(id, title, content);
    res.json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// delete a post
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await posts.deletePost(id);
    res.json(deletedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get all posts by user id
router.get('/user/:user_id', async (req, res) => {
  const { user_id } = req.params;
  try {
    const userPosts = await posts.getPostsByUserId(user_id);
    console.log('userPosts:', userPosts);
    res.json(userPosts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;