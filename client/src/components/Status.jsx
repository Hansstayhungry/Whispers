import React from "react";
import "../styles/Status.scss";

const Status = (props) => {

  const {link, handleLink, user} = props;

  return (
    <div className="status-container">
      <h2>Welcome back, {user.username}!</h2>
      {!link && <h2>You haven't linked with your partner, please use top right Link button to manage the link now</h2>}
    </div>
  )
}

export default Status;
