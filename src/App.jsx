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
    <div>
      <Header></Header>
      <CreateArea onAdd={addNote}></CreateArea>
      {notes.map((note, index) => (
        <Note key={index} id={index} title={note.title} content={note.content}
        onDelete={deleteNote}></Note>        
      ))}
      <Footer></Footer>
    </div>
      
  )
}

export default App;


//1. Implement the add note functionality.
//- Create a constant that keeps track of the title and content.
//- Pass the new note back to the App.
//- Add new note to an array
//- Take array and render seperate Note components for each item.

//2. Implement the delete note functionality.
//- Callback from the Note component to trigger a delete function.
//- Use the filter function to filter out the item that needs deletion.
//- Pass a id over to the Note component, pass it back to the App when deleting.


//Further
// 1. Hide input title area by default, 
  // show it when clicked textarea (from row 1 to row 3)
// 2. hide fab button by default, 