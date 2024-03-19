import React from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NoPage from './pages/NoPage';
import Home from './pages/Home';
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Routes, Route, RouterProvider } from 'react-router-dom';
import { create } from '@mui/material/styles/createTransitions';
import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  // State to manage the user's logged-in status
  const [user, setUser] = useState(null);

  // Function to handle login
  const handleLogin = (userData) => {
    // Login logic...
    setUser(userData);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Logout logic...
    setUser(null);
  };

  // Effect to check for logged-in user on initial load
  useEffect(() => {
    axios.get('/checkLoggedInUser')
      .then(response => {
        setUser(response.data.user);
      })
      .catch(error => {
        console.error('Error checking logged-in user:', error);
      });
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home handleLogin={handleLogin} handleLogout={handleLogout} user={user}/>,
    },
    {
      path: '/login',
      element: <Login handleLogin={handleLogin} handleLogout={handleLogout}/>,
    },
    {
      path: '/signup',
      element: <Signup handleLogin={handleLogin} handleLogout={handleLogout}/>,
    },
    {
      path: '*',
      element: <NoPage />,
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App;