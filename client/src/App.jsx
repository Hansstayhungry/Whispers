import React from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NoPage from './pages/NoPage';
import Home from './pages/Home';
import Link from './pages/Link';
import ToMe from './pages/ToMe';
import ToTa from './pages/ToTa';
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Routes, Route, RouterProvider, Navigate } from 'react-router-dom';
import { create } from '@mui/material/styles/createTransitions';
import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  // State to manage the user's logged-in status
  const [user, setUser] = useState(null);

  // State to manage the partner's information
  const [partner, setPartner] = useState(null);

  // State to manage loading status
  const [loading, setLoading] = useState(true);

  // state to manage if user is linked with another user
  const [linked, setLinked] = useState(false);

  // Function to handle login
  const handleLogin = (userData) => {
    setUser(userData);
  };

  // Function to handle logout
  const handleLogout = () => {
    axios.get('/users/logout')
      .then(() => {
        setUser(null);
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
    setUser(null);
  };

  // Effect to check for logged-in user on initial load
  useEffect(() => {
    axios.get('users/checkLoggedInUser')
      .then(response => {
        setUser(response.data.user);
      })
      .then(() => {
        setLoading(false);
      })
      .catch(error => {
        console.error('Error checking logged-in user:', error);
      });
  }, []);

  // Check if user is linked with another user
  useEffect(() => {
    // ensure checkedLoggedInUser is completed before checking linked relation"
      axios.get('links/checkLinked')
        .then(response => {
          setLinked(response.data.linked);
          const { id: partnerId, email: partnerEmail, username: partnerUsername } = response.data.partner;
          setPartner({ id: partnerId, email: partnerEmail, username: partnerUsername });
        })
        .catch(error => {
          console.error('Error checking linked user:', error);
        });      
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home handleLogin={handleLogin} handleLogout={handleLogout} user={user} loading={loading} linked={linked} partner={partner} />,
    },
    {
      path: '/login',
      element: <Login handleLogin={handleLogin} handleLogout={handleLogout} />,
    },
    {
      path: '/signup',
      element: <Signup handleLogin={handleLogin} handleLogout={handleLogout} />,
    },
    {
      path: '*',
      element: <NoPage />,
    }, 
    {
      path: '/to-me',
      element: <ToMe handleLogin={handleLogin} handleLogout={handleLogout} user={user} loading={loading} setUser={setUser} partner={partner} />,
    },
    {
      path: '/to-ta',
      element: <ToTa handleLogin={handleLogin} handleLogout={handleLogout} user={user} loading={loading} setUser={setUser} />,
    },

    // redirect to home page if not logged in
    {
      path: '/link',
      element: user ? (
        <Link setLinked={setLinked} linked={linked} handleLogin={handleLogin} handleLogout={handleLogout} user={user} loading={loading} />
      ) : (
        <Navigate to='/' />
      ),
    },
  ]);
  
  return (
    <RouterProvider router={router} />
  )
}

export default App;