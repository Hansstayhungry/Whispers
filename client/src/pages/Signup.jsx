import React from "react";
import { FormControl, Input, InputLabel, FormHelperText, Box } from "@mui/material";
import Footer from "../components/Footer";
import Headers from "../components/Header";
import '../styles/Signup.scss'

const Signup = (props) => {

  return (
    <div>
      <Headers />
      <form className='signup-form' action="/signup" method="POST">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required/>

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required/>

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required/>
        
        <button type="submit">Sign Up</button>
      </form>
      <Footer />
    </div>
  )
}

export default Signup;