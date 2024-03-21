import React from "react";
import Header from "../components/Header"
import "../styles/Status.scss";
import axios from "axios";
import { useState, useEffect } from "react";

const ToTa = (props) => {
  const {user, link, handleLogout} = props;

  // track every single posts state
  const [posts, setPosts] = useState([]);

  // get all posts by user id

  const allPosts = async () => {
    try {
      const 
    }
  }
  return (
    <div>
      <Header user={user} handleLogout={handleLogout}/>
      <div className="ToTa-container">
        <h2>ToTa</h2>
      </div>
    </div>

  )
}

export default ToTa;
