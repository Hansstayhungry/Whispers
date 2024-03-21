import React, { useState, useReducer, useEffect } from "react";
import Header from "../components/Header";
import Post from "../components/Post";
import Footer from "../components/Footer";
import CreateArea from "../components/CreateArea";
import Status from "../components/Status";
import Navbar from "../components/Navbar";

const Home = (props) => {

  const {handleLogin, handleLogout, user, loading} = props;

  // PENDING: MOVE TO HOOKS FOLDER, SEPARATION OF CONCERN
  // track onAdd ALL notes 
  const [notes, setNotes] = useState([]);

  const addNote = function(note) {
    setNotes(prevNotes => {
      return [...prevNotes, note];
    });
  }

  const deleteNote = function(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((prevNote, index) => (index !== id))
    })
  }

  return (
    <div className="app-container">    
      <Header handleLogin={handleLogin} handleLogout={handleLogout} user={user} loading={loading}></Header>
      {user && <Navbar user={user}></Navbar>}
      {user && <Status user={user}/>}
      <CreateArea onAdd={addNote}></CreateArea>
      {notes.map((note, index) => {
        return (
          <Post key={index} id={index} title={note.title} content={note.content}
          onDelete={deleteNote}></Post>
        )
      })}
      <Footer></Footer>
    </div>
  )
}

export default Home;