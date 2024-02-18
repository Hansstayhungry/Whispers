import React, { useState } from "react";

const CreateArea = () => {

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

  return (
    <div>
      <form>
        <input name="title" onChange={handleChange} value={note.title} placeholder="Title" />
        <textarea name="content" onChange={handleChange} value={note.content} placeholder="Take a note..." rows="3" />
        <button>Add</button>
      </form>
    </div>
  )
}

export default CreateArea;