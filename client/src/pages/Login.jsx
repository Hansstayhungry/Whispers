import React, { useState } from "react";
import { redirect } from "react-router-dom";
import { FormControl, Input, InputLabel, FormHelperText } from "@mui/material";
import Footer from "../components/Footer";
import Headers from "../components/Header";
import "../styles/Login.scss"
// import axios from "axios";

const Login = (props) => {

  const [loginFormDatas, setLoginFormDatas] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = function(event) {
    event.preventDefault();
  }

  const handleChange = function(event) {
    const {name, value} = event.target;
    setLoginFormDatas( prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }



  return (
    <div>
      <Headers />
      <form className='login-form' onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={loginFormDatas.email} onChange={handleChange} required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" value={loginFormDatas.password} onChange={handleChange} required />

        <button type="submit" name="submit">Log In</button>
      </form>
      <Footer />
    </div>
  )
}

export default Login;