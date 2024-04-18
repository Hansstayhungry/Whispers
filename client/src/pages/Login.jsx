import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl, Input, InputLabel, FormHelperText } from "@mui/material";
import Footer from "../components/Footer";
import Headers from "../components/Header";
import "../styles/Login.scss"
import axios from "axios";

const Login = (props) => {

  const { api, setUser, setLinked, setPartner } = props;

  //useNavigate to redirect to main page
  const navigate = useNavigate();

  const [loginFormDatas, setLoginFormDatas] = useState({
    email: '',
    password: ''
  })

  const [loginError, setLoginError] = useState('false');
  const [serverError, setServerError] = useState('false');

  // set up axios to send cookies
  api.defaults.withCredentials = true

  const handleChange = function(event) {
    const {name, value} = event.target;
    setLoginFormDatas( prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  // Function to handle login
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await api.post('/users/login', loginFormDatas);
      console.log("response1: ", response.data.userInfo);

      if (response.data.userInfo) {
        // // set login state to true if sign up is successful, and pass user info to parent component
        setUser(response.data.userInfo);
        console.log("set user response.data.userInfo: ", response.data.userInfo);

        // const res = await api.post('/links/checkLinked', response.data.userInfo);
        // console.log("res", res);
        // if (res.data.partner) {
        //   setLinked(res.data.linked);
        //   const { id: partnerId, email: partnerEmail, username: partnerUsername } = response.data.partner;
        //   console.log("partnerId", partnerId, "partnerEmail", partnerEmail, "partnerUsername", partnerUsername);
        //   setPartner({ id: partnerId, email: partnerEmail, username: partnerUsername });
        // } else {
        //   console.log("no partner");
        // }        

        // use navigate to redirect to main page
        navigate('/');
        // redirect('/');
        return        
      } else {
        setLoginError('true');       
        console.log("loginError: ", loginError); 
      }

    } catch (error) {
      console.error('Error during login:', error);
      setServerError('true');
    }
  };

  return (
    <div>
      <Headers />
      <form className='login-form'>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
        value={loginFormDatas.email} onChange={handleChange} required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" value={loginFormDatas.password} onChange={handleChange} required />

        <button type="submit" name="submit" onClick={handleLogin}>Log In</button>
        {loginError === 'true' && <p>Invalid email or password, please try again</p>}
        {serverError === 'true' && <p>Internal server error, please try again later</p>}
      </form>
      <Footer />
    </div>
  )
}

export default Login;