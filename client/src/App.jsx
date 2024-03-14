import React, { useState, useReducer } from "react";
import Header from "./components/Header";
import Note from "./components/Note";
import Footer from "./components/Footer";
import CreateArea from "./components/CreateArea";
import Status from "./components/Status";
import Login from './pages/Login';
import Signup from './pages/Signup';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

const App = () => {

  // PENDING: MOVE TO HOOKS FOLDER, SEPARATION OF CONCERN
  // track onAdd ALL notes 
  const [notes, setNotes] = useState([]);

  // use useReducer to handle login logout state
  const initialTasks = {isLogin: false};

  const taskReducer = function(tasks, action) {
    switch (action.type) {
      case 'LOGIN': {
        return [{
          isLogin: true
        }]
      }
      case 'LOGOUT': {
        return [{
          isLogin: false
        }]
      }
    }
  }

  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

  const handleLogin = function() {
    dispatch({type: 'LOGIN'});
  }

  const handleLogout = function() {
    dispatch({type: 'LOGOUT'});
  }

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
      {/* // set up react-router for multipage support */}
      <Routes>
        <Route path="/home" element={<App tasks={tasks} handleLogin={handleLogin} handleLogout={handleLogout}/>} />
        <Route path="/login" element={<Login handleLogin={handleLogin}/>} />
        <Route path="/signup" element={<Signup handleLogin={handleLogin}/>} />              
      </Routes>
    
      <Header handleLogin={handleLogin} handleLogout={handleLogout} ></Header>
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