import React, { useState, useReducer, useEffect } from "react";
import Header from "../components/Header";
import '../styles/Link.scss';

const Link = (props) => {
  
    const {handleLink, link, user, handleLogout} = props;
  
    return (
      <div>
        <Header user={user} handleLogout={handleLogout}/>
        <div className="link-container">
          <h1>Manage Link</h1>
          <p>Link with your partner to start sending messages</p>
          <form className="link-form">
            <input type="text" placeholder="Enter your partner's email"></input>
            <button onClick={handleLink}>Link</button>
          </form>
        </div>
      </div>
    )
  }

export default Link;