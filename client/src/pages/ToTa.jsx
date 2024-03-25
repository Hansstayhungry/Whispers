import React from "react";
import Header from "../components/Header"
import "../styles/Status.scss";
import axios from "axios";
import { useState, useEffect } from "react";

const ToTa = (props) => {
  const {user, link, handleLogout} = props;

  // track every single posts state
  const [posts, setPosts] = useState([{content: "No post yet!"}]);

  // get all posts by user id

  const allPostsByUserId = async () => {
    try {
      const response = await axios.get(`/posts/user/${user['id']}`);
      console.log("response", response);
      if (response.data.length !== 0) {
        setPosts(response.data);
      }
    } catch (error) {
      console.error('Error getting all posts by user id:', error);
    }
  }
  // useEffect to get all posts by user id
  useEffect(() => {
    allPostsByUserId();
  }
  ,[]);

  return (
    <div>
      <Header user={user} handleLogout={handleLogout}/>
      <div className="ToTa-container">
        <h2>ToTa</h2>
        <div className="posts-container">
          {/* map through all posts and display them */}
          {posts.map((post, index) => {
            return (
              <div key={index} className="post">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
              </div>
            )
          })}
          </div>
      </div>
    </div>

  )
}

export default ToTa;
