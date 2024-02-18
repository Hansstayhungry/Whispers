import React from "react";

const Note = (props) => {

  const {title, content} = props;

  return (
    <div className="note">
      <h2>{title}</h2>
      <p>{content}</p>   
    </div>
  )
}

export default Note;
