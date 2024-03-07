import React from "react";
import { FormControl, Input, InputLabel, FormHelperText } from "@mui/material";
import Footer from "../components/Footer";
import Headers from "../components/Header";

const Signup = (props) => {

  return (
    <div>
      <Headers />
      <form>
        <label for="name">Name</label>
        <input type="text" id="name" name="name" />

        <label for="email">Email</label>
        <input type="email" id="email" name="email" />

        <label for="password">Password</label>
        <input type="password" id="password" name="password" />
        
        <button type="submit">Sign Up</button>
      </form>
      <Footer />
    </div>
  )
}

export default Signup;