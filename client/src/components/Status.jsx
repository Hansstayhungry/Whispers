import React from "react";
import "../styles/Status.scss";

const Status = (props) => {

  const {tasks} = props;
  return (
    <div className="status-container">
      <h2>Welcome back! {tasks.userInfo.username}</h2>
    </div>
  )
}

export default Status;
