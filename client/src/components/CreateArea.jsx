import React, { useState } from "react";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import { Fab, Zoom } from "@mui/material";
import "../styles/CreateArea.scss";

const CreateArea = (props) => {

  const [note, setNote] = useState({
    title: "",
    content: ""
  })

  // input display state
  const [showInput, setShowInput] = useState(false)

  // input display state handler
  const handleInputDisplay = function () {
    setShowInput(true);
  }

  const handleChange = function (e) {
    const {name, value} = e.target;

    setNote(prev => {
      return {
        ...prev,
        user_id: props.user['id'],
        [name]: value
      }
    })
  }

  // prevent submission button refresh default
  // add note to app page
  const handleSubmission = function (e) {
    // props.onAdd(note);
    e.preventDefault();
    axios.post('/posts/create', note)

    clearInput()
  }

  //clear input area after submitted
  const clearInput = function() {
    setNote({
      title: "",
      content: ""
    })
  }

  // get current day, date, and month
  const currentDate = function () {
    const date = new Date();
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long"
    }
    return date.toLocaleDateString("en-US", options);
  }


  return (
    <div>
      <form className="create-note">
        <h2>{showInput ? currentDate() : ""}</h2>
        {showInput && (
          <input name="title" onChange={handleChange} value={note.title} placeholder="Title" autoFocus/>
          )}
        <textarea name="content" onClick={handleInputDisplay} onChange={handleChange} value={note.content} placeholder="Whisper your love..." rows={showInput ? 5 : 1} />
        <Zoom in={showInput ? true : false} ><Fab onClick={handleSubmission}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  )
}

export default CreateArea;