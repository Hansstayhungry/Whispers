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
  // Create an instance of Axios with a baseURL
  const api = axios.create({
    baseURL: 'https://whispers-backend.onrender.com', // Replace with backend URL
  });


  api.defaults.withCredentials = true;

  // State to manage the user information
  const [user, setUser] = useState();

  // State to manage the partner's information
  const [partner, setPartner] = useState();

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
    api.get('/users/logout')
      .then(() => {
        setUser();
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  // Effect to check for logged-in user on initial load
  useEffect(() => {
      checkSession();
  }, []);

  // Function to check for logged-in user
  const checkSession = async () => {
    try {
      const response = await api.get('/users/checkLoggedInUser');
      if (response.data.authenticated) {
        setUser(response.data.userInfo);
        console.log("setUser(response.data.userInfo): ", response.data.userInfo);

        console.log("response.data.userInfo: ", response.data.userInfo);
        console.log("checkLoggedInUser");
        setLoading(false);
      }
    } catch (error) {
      console.error('Error checking logged-in user:', error);
    }
  };
  

    // Check if user is linked with another user
  useEffect(() => {
    checkLinked();
  }, [user]);

  const checkLinked = async () => {
    try {
      const response = await api.get('/links/checkLinked');
      console.log("checkLinked");
      if (response.data.linked) {
        setLinked(response.data.linked);
        const { id: partnerId, email: partnerEmail, username: partnerUsername } = response.data.partner;
        setPartner({ id: partnerId, email: partnerEmail, username: partnerUsername });        
      }
    } catch (error) {
      console.error('Error checking linked user:', error);
    }
  };


  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home handleLogin={handleLogin} handleLogout={handleLogout} user={user} loading={loading} linked={linked} partner={partner} api={api}/>,
    },
    {
      path: '/login',
      element: <Login handleLogin={handleLogin} handleLogout={handleLogout} api={api}/>,
    },
    {
      path: '/signup',
      element: <Signup handleLogin={handleLogin} handleLogout={handleLogout} api={api}/>,
    },
    {
      path: '*',
      element: <NoPage />,
    }, 
    {
      path: '/to-me',
      element: <ToMe handleLogin={handleLogin} handleLogout={handleLogout} user={user} loading={loading} setUser={setUser} partner={partner} api={api}/>,
    },
    {
      path: '/to-ta',
      element: <ToTa handleLogin={handleLogin} handleLogout={handleLogout} user={user} loading={loading} setUser={setUser} api={api}/>,
    },

    // redirect to home page if not logged in
    {
      path: '/link',
      element: user ? <Link setLinked={setLinked} linked={linked} handleLogin={handleLogin} handleLogout={handleLogout} user={user} loading={loading} api={api}
        setPartner={setPartner}/>
      : <Navigate to="/" />
    }
  ]);
  
  return (
    <RouterProvider router={router} />
  )
}

export default App;