import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import "../styles/Note.scss";

const Note = (props) => {

  const {id, title, content} = props;

  const handleDelete = function() {
    props.onDelete(id)
  }

  return (
    <div className="note-container">
      <h2>{title}</h2>
      <p>{content}</p>
      <span className="button-container">
        <button onClick={handleDelete}>
          <EditIcon className="edit-icon"/>
        </button>
        <button onClick={handleDelete}>
        <DeleteIcon className="delete-icon"/>
        </button>
      </span>
    </div>
  )
}

export default Note;
