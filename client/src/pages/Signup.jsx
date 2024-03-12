import React, {useState} from "react";
import { FormControl, Input, InputLabel, FormHelperText, Box } from "@mui/material";
import Footer from "../components/Footer";
import Headers from "../components/Header";
import axios from "axios";
import '../styles/Signup.scss'

const Signup = (props) => {
  // get sign up info from user
  const [formDatas, setFormDatas] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = function(e) {
    const {name, value} = e.target;
    setFormDatas(prev => {
      return {...prev, [name]: value};
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users/signup', formDatas);
      console.log(response);
    } catch (error) {
      console.error('Error during signup:', error);
    }
  }


  return (
    <div>
      <Headers />
      <form className='signup-form' onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={formDatas.name} onChange={handleChange} required/>

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={formDatas.email} onChange={handleChange} required/>

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" value={formDatas.password} onChange={handleChange} required/>
        
        <button type="submit" name="submit">Sign Up</button>
      </form>
      <Footer />
    </div>
  )
}

export default Signup;