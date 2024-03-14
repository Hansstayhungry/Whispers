import React from "react";
import "../styles/Status.scss";

const Status = (props) => {

  const {id, title, content} = props;

  const handleDelete = function() {
    props.onDelete(id)
  }

  return (
    <div className="status-container">
      <p>Welcome back! </p>
    </div>
  )
}

export default Status;
