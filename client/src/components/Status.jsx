import React from "react";
import "../styles/Status.scss";

const Status = (props) => {

  const {user} = props;
  return (
    <div className="status-container">
      <h2>Welcome back! {user.username}</h2>
    </div>
  )
}

export default Status;
