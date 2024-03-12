import React, { useState } from "react";
import Header from "./components/Header";
import Note from "./components/Note";
import Footer from "./components/Footer";
import CreateArea from "./components/CreateArea";

const App = () => {

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
      <Header></Header>
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