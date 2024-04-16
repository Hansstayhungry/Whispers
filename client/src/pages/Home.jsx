import React, { useState, useReducer, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CreateArea from "../components/CreateArea";
import Status from "../components/Status";
import Navbar from "../components/Navbar";
import Lottie from "lottie-react";
import loveseat from "../assets/images/loveseat.json";
import "../styles/Home.scss";

const Home = (props) => {

  const { handleLogin, handleLogout, user, loading, partner, api } = props;

  return (
    <div className="app-container">    
      <Header handleLogin={handleLogin} handleLogout={handleLogout} user={user} loading={loading}></Header>
      {user && <Navbar user={user} partner={partner}></Navbar>}
      {user && <Status user={user} partner={partner}/>}
      {user && <CreateArea user={user} api={api}></CreateArea>}
      <div className="loveseat-container">
        <Lottie animationData={loveseat} loop={true} width={400}/>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Home;