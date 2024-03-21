import React from "react";
import Header from "../components/Header"
import "../styles/Status.scss";

const ToMe = (props) => {
  const {user, link, handleLogout} = props;
  return (
    <div>
      <Header user={user} handleLogout={handleLogout}/>
      <div className="ToMe-container">
        <h2>ToMe</h2>
      </div>
    </div>

  )
}

export default ToMe;
