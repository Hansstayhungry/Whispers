import React, { useState, useReducer, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CreateArea from "../components/CreateArea";
import Status from "../components/Status";
import Navbar from "../components/Navbar";

const Home = (props) => {

  const {handleLogin, handleLogout, user, loading, partner} = props;

  return (
    <div className="app-container">    
      <Header handleLogin={handleLogin} handleLogout={handleLogout} user={user} loading={loading}></Header>
      {user && <Navbar user={user} partner={partner}></Navbar>}
      {user && <Status user={user} partner={partner}/>}
      <CreateArea user={user}></CreateArea>
      <Footer></Footer>
    </div>
  )
}

export default Home;