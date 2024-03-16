import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl, Input, InputLabel, FormHelperText } from "@mui/material";
import Footer from "../components/Footer";
import Headers from "../components/Header";
import "../styles/Login.scss"
import axios from "axios";

const Login = (props) => {

  const { handleLogin } = props;

  // redirect to main page using react router dom
  const navigate = useNavigate();

  const [loginFormDatas, setLoginFormDatas] = useState({
    email: '',
    password: ''
  })

  const [loginError, setLoginError] = useState('false');

  const handleSubmit = async function (event) {
    event.preventDefault();
    try {
      const response = await axios.post('/users/login', loginFormDatas);
      console.log(response);

      if (response.data.match) {
        // // set login state to true if sign up is successful
        handleLogin();

        // use navigate to redirect to main page
        navigate('/');
        // redirect('/');
        return        
      }

      if (!response.data.match) {
        setLoginError('true');
        return
      }

    } catch (error) {
      console.error('Error during login:', error);
    }
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
        {loginError === 'true' && <p>Invalid email or password, please try again</p>}
      </form>
      <Footer />
    </div>
  )
}

export default Login;