import React from "react";
import { FormControl, Input, InputLabel, FormHelperText } from "@mui/material";
import Footer from "../components/Footer";
import Headers from "../components/Header";
import axios from "axios";

const Login = (props) => {

  const handleSubmission = function(event) {
    event.preventDefault();
    
  }

  return (
    <div>
      <Headers />
      <form action="/login" method="POST">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required />

        <label for="password">Password</label>
        <input type="password" id="password" name="password" required />

        <button type="submit" onClick={handleSubmission}>Log In</button>
      </form>
      <Footer />
    </div>
  )
}

export default Login;