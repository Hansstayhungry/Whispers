import React from "react";
import Header from "../components/Header"
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ToMe.scss";

const ToMe = (props) => {
  const {user, link, handleLogout, loading, setUser, partner, api} = props;
  console.log("user", user);

  // track every single posts state
  const [posts, setPosts] = useState([]);

  // track loading state
  const [isloadingStatus, setIsloadingStatus] = useState(false);

  // track no post state
  const [noPost, setNoPost] = useState();

  // get all posts by user id

  const allPostsByUserId = async () => {
    try {
      setIsloadingStatus(true);
      const response = await api.get(`/posts/user/${partner['id']}`);
      console.log("response", response);
      if (response.data.length === 0) {
        setPosts([]);
        setNoPost([{message: "No post yet! Go ahead and create your first whisper to your love!"}])
      } else {
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
  },[partner]);


  // convert time to system local time
  const localTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString();
  }

  // handle delete post by post id
  const handleDelete = async (postId) => {
    try {
      await api.delete(`/posts/delete/${postId}`);
      allPostsByUserId();
    } catch (error) {
      console.error('Error when deleting post:', error);
    }
  }

  return (
    <div>
      <Header user={user} handleLogout={handleLogout} loading={loading}/>
      <div className="ToMe-container">
        <h2>ToMe</h2>
        <div className="posts-container">
          {isloadingStatus ? (
            <h2>Loading...</h2>
          ) : (
            noPost ? (
              <h2>{posts[0].message}</h2>
            ) : (
              posts.map((post, index) => (
                <div key={index} className="post">
                  <h3>{post.title}</h3>
                  <p className="content">{post.content}</p>
                  <p className="date">Posted at {localTime(post.created_at)}</p>
                </div>
              ))
            )
          )}
        </div>
      </div>
    </div>
  );  
}

export default ToMe;
