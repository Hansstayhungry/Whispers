import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl, Input, InputLabel, FormHelperText } from "@mui/material";
import Footer from "../components/Footer";
import Headers from "../components/Header";
import "../styles/Login.scss"
import axios from "axios";

const Login = (props) => {

  const { handleLogin, api } = props;

  // redirect to main page using react router dom
  const navigate = useNavigate();

  const [loginFormDatas, setLoginFormDatas] = useState({
    email: '',
    password: ''
  })

  const [loginError, setLoginError] = useState('false');
  const [serverError, setServerError] = useState('false');

  // set up axios to send cookies
  api.defaults.withCredentials = true

  const handleSubmit = async function (event) {
    event.preventDefault();
    try {
      const response = await api.post('/users/login', loginFormDatas);

      if (response.data.userInfo) {
        // // set login state to true if sign up is successful, and pass user info to parent component
        handleLogin(response.data.userInfo);

        // use navigate to redirect to main page
        navigate('/');
        // redirect('/');
        return        
      } else {
        setLoginError('true');        
      }

    } catch (error) {
      console.error('Error during login:', error);
      setServerError('true');
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
        <input type="email" id="email" name="email" pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
        value={loginFormDatas.email} onChange={handleChange} required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" value={loginFormDatas.password} onChange={handleChange} required />

        <button type="submit" name="submit">Log In</button>
        {loginError === 'true' && <p>Invalid email or password, please try again</p>}
        {serverError === 'true' && <p>Internal server error, please try again later</p>}
      </form>
      <Footer />
    </div>
  )
}

export default Login;