import React from "react";
import Header from "../components/Header"
import "../styles/ToTa.scss";
import axios from "axios";
import { useState, useEffect } from "react";

const ToTa = (props) => {
  const {user, link, handleLogout, loading} = props;

  // track every single posts state
  const [posts, setPosts] = useState([{error: "No post yet! Go ahead and create your first whisper to your love!"}]);


  // track loading state
  const [isloadingStatus, setIsloadingStatus] = useState(false);
  
  // get all posts by user id

  const allPostsByUserId = async () => {
    try {
      setIsloadingStatus(true);
      const response = await axios.get(`/posts/user/${user['id']}`);
      console.log("response", response);
      if (response.data.length !== 0) {
        setPosts(response.data);
      }
    } catch (error) {
      console.error('Error getting all posts by user id:', error);
    } finally {
      setIsloadingStatus(false);
    }
  }
  // useEffect to get all posts by user id
  useEffect(() => {
    allPostsByUserId();
  }
  ,[user]);

  // convert time to system local time
  const localTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString();
  }

  // handle delete post by post id
  const handleDelete = async (postId) => {
    try {
      await axios.delete(`/posts/delete/${postId}`);
      allPostsByUserId();
    } catch (error) {
      console.error('Error when deleting post:', error);
    }
  }

  return (
    <div>
      <Header user={user} handleLogout={handleLogout} loading={loading}/>
      <div className="ToTa-container">
        <h2>ToTa</h2>
        <div className="posts-container">
          {isloadingStatus ? (
            <h2>Loading...</h2>
          ) : (
            posts[0].error ? (
              <h2>{posts[0].error}</h2>
            ) : (
              posts.map((post, index) => (
                <div key={index} className="post">
                  <h3>{post.title}</h3>
                  <p className="content">{post.content}</p>
                  <p className="date">Posted at {localTime(post.created_at)}</p>
                  <button className="delete-button" onClick={() => handleDelete(post.id)}>Delete</button>
                </div>
              ))
            )
          )}
        </div>
      </div>
    </div>
  );  
}

export default ToTa;
