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
  const [serverError, setServerError] = useState('false');

  const handleSubmit = async function (event) {
    event.preventDefault();
    try {
      const response = await axios.post('/users/login', loginFormDatas);
      console.log(response);

      if (response.data.match) {
        // // set login state to true if sign up is successful, and pass user info to parent component
        handleLogin(response.data.userInfo);
        console.log("response.data.userInfo", response.data.userInfo)

        // use navigate to redirect to main page
        navigate('/');
        // redirect('/');
        return        
      }
      setLoginError('true');

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
        <input type="email" id="email" name="email" value={loginFormDatas.email} onChange={handleChange} required />

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