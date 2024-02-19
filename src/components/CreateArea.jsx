import React, { useState } from "react";

const CreateArea = (props) => {

  const [note, setNote] = useState({
    title: "",
    content: ""
  })

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
      <form>
        <input name="title" onChange={handleChange} value={note.title} placeholder="Title" />
        <textarea name="content" onChange={handleChange} value={note.content} placeholder="Take a note..." rows="3" />
        <button onClick={handleSubmission}>Add</button>
      </form>
    </div>
  )
}

export default CreateArea;