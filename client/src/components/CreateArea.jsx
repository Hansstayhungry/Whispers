import React, { useState } from "react";
import axios from "axios";
import SendIcon from '@mui/icons-material/Send';
import { Fab, Zoom } from "@mui/material";
import "../styles/CreateArea.scss";

const CreateArea = (props) => {

  const { api } = props;

  const [post, setPost] = useState({
    title: "",
    content: ""
  })

  // input display state
  const [showInput, setShowInput] = useState(false)

  // input display state handler
  const handleInputDisplay = function () {
    setShowInput(true);

    //set start date if it hasn't set before
    // placeholder for using state date value in future
    if (!post.start_date) {
      setPost(prev => ({
        ...prev,
        start_date: currentDate()
      }))
    }
  }

  const handleChange = function (e) {
    const {name, value} = e.target;

    setPost(prev => ({
        ...prev,
        user_id: props.user['id'],
        [name]: value
      })
    )
  }

  // prevent submission button refresh default
  // add post to post page
  const handleSubmission = function (e) {
    // props.onAdd(note);
    e.preventDefault();
    api.post('/posts/create', post)

    clearInput()
  }

  //clear input area after submitted
  const clearInput = function() {
    setPost({
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
      <form className="create-post">
        <h2>{showInput ? currentDate() : ""}</h2>
        {showInput && (
          <input name="title" onChange={handleChange} value={post.title} placeholder="Title" autoFocus/>
          )}
        <textarea name="content" onClick={handleInputDisplay} onChange={handleChange} value={post.content} placeholder="Whisper your love..." rows={showInput ? 5 : 1} />
        <Zoom in={showInput ? true : false} ><Fab onClick={handleSubmission}>
            <SendIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  )
}

export default CreateArea;