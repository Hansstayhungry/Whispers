import React, { useState, useReducer } from "react";
import Header from "./components/Header";
import Note from "./components/Note";
import Footer from "./components/Footer";
import CreateArea from "./components/CreateArea";
import Status from "./components/Status";

const App = (props) => {

  const {handleLogin, handleLogout, tasks} = props;
  const {isLogin} = tasks;

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
      <Header handleLogin={handleLogin} handleLogout={handleLogout} isLogin={isLogin}></Header>
      {tasks.isLogin && <Status /> }
      <CreateArea onAdd={addNote}></CreateArea>
      {notes.map((note, index) => {
        return (
          <Note key={index} id={index} title={note.title} content={note.content}
          onDelete={deleteNote}></Note>
        )
      })}
      <Footer></Footer>
    </div>
  )
}

export default App;