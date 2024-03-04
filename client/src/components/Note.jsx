import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

const Note = (props) => {

  const {id, title, content} = props;

  const handleDelete = function() {
    props.onDelete(id)
  }

  return (
    <div className="note">
      <h2>{title}</h2>
      <p>{content}</p>
      <button onClick={handleDelete}>
        <DeleteIcon />
      </button>
    </div>
  )
}

export default Note;
