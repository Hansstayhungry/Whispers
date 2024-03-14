import React, { useState } from "react";
import { redirect, useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";
import Headers from "../components/Header";
import axios from "axios";
import '../styles/Signup.scss'

const Signup = (props) => {
  const { handleLogin } = props;

  // redirect to main page using react router dom
  const navigate = useNavigate();

  // get sign up info from user
  const [signupFormDatas, setSignupFormDatas] = useState({
    username: '',
    email: '',
    password: '',
  })

  // capture user input to send over to useState above
  const handleChange = function(e) {
    const {name, value} = e.target;
    setSignupFormDatas(prev => {
      return {...prev, [name]: value};
    })
  }

  // 
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users/signup', signupFormDatas);
      console.log(response);

      // // set login state to true if sign up is successful
      handleLogin();

    // use navigate to redirect to main page
      navigate('/');
      // redirect('/');

    } catch (error) {
      console.error('Error during signup:', error);
    }
  }


  return (
    <div>
      <Headers />
      {/* use new-password keyword to avoid autoComplete in chrome */}
      <form className='signup-form' onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="username" name="username" value={signupFormDatas.name} onChange={handleChange} autoComplete="new-password" required/>

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={signupFormDatas.email} onChange={handleChange} autoComplete="new-password" required/>

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" value={signupFormDatas.password} onChange={handleChange} autoComplete="new-password" required/>
        
        <button type="submit" name="submit">Sign Up</button>
      </form>
      <Footer />
    </div>
  )
}

export default Signup;