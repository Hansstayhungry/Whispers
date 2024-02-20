import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Fab, Zoom } from "@mui/material";

const CreateArea = (props) => {

  const [note, setNote] = useState({
    title: "",
    content: ""
  })

  // input display state
  const [showInput, setShowInput] = useState(false)

  // input display state handler
  const handleInputDisplay = function () {
    console.log("handleInputDisplay is triggered");
  }


  // fab button display state
  const [showButton, setShowButton] = useState(false)

  // // fab button display state handler
  const handleButtonDisplay = function () {
    console.log("handleButtonDisplay is triggered");
  }

  const handleChange = function (e) {
    const {name, value} = e.target;

    setNote(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  // prevent submission button refresh default
  // add note to app page
  const handleSubmission = function (e) {
    props.onAdd(note);
    e.preventDefault();

    clearInput()
  }

  //clear input area after submitted
  const clearInput = function() {
    setNote({
      title: "",
      content: ""
    })
  }


  return (
    <div>
      <form className="create-note">
        {showInput && (
          <input name="title" onChange={handleChange} value={note.title} placeholder="Title" />
          )}
        <textarea name="content" onChange={handleChange} value={note.content} placeholder="Take a note..." rows={showInput ? 3 : 1} />
        <Zoom in={showInput ? true : false} ><Fab onClick={handleSubmission}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  )
}

export default CreateArea;