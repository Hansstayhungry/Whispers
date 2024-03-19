import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Routes, Route, RouterProvider } from 'react-router-dom';
import { create } from '@mui/material/styles/createTransitions';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import Cookies from 'js-cookie'

// need to wrap inside a react component in order to call react hooks
const AppRouter = () => {
  // check if cookie exists

  // const [user, setUser] = useState();
  
  // PENDING: MOVE TO HOOKS FOLDER, SEPARATION OF CONCERN

  const [user, setUser] = useState(null);

  // set up axios to send cookies
  axios.defaults.withCredentials = true

  useEffect(() => {
    // check if user is logged in
        axios.get('/')
        .then( res => {
          console.log('checkUser:', res.data);
        })
        // if (response.data.user) {
        //   handleLogin(response.data.user);
        // }
        .catch (error => console.error('Error during checkUser:', error));
    }, []);

  const handleLogin = function(userInfo) {
    setUser(userInfo);
  }
  
  // clear cookies at logout
  const handleLogout = async function() {
    try {
      await axios.get('/users/logout');
      setUser(null);
    } catch (error) {
      console.error('Error clearing cookies:', error);
    }
  }

  {/* // set up react-router for multipage support */}
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App handleLogin={handleLogin} handleLogout={handleLogout} user={user}/>,
    },
    {
      path: '/login',
      element: <Login handleLogin={handleLogin} handleLogout={handleLogout}/>,
    },
    {
      path: '/signup',
      element: <Signup handleLogin={handleLogin} handleLogout={handleLogout}/>,
    }
  ]);
  return (
    <RouterProvider router={router} />
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
