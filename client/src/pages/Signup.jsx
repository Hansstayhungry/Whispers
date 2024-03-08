import React from "react";
import { FormControl, Input, InputLabel, FormHelperText, Box } from "@mui/material";
import Footer from "../components/Footer";
import Headers from "../components/Header";

const Signup = (props) => {

  return (
    <div>
      <Headers />
      <form action="/signup" method="POST">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required/>

        <label for="email">Email</label>
        <input type="email" id="email" name="email" required/>

        <label for="password">Password</label>
        <input type="password" id="password" name="password" required/>
        
        <button type="submit">Sign Up</button>
      </form>
      <Footer />
    </div>
  )
}

export default Signup;