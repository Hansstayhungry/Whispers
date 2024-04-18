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
    baseURL: 'https://whispers-backend.onrender.com/', // Replace with backend URL
    // https://whispers-backend.onrender.com/ or http://localhost:8080
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


  // Function to check for logged-in user
  const checkSession = async () => {
    try {
      const response = await api.get('/users/checkLoggedInUser');
      console.log("checkSession");
      if (response.data.authenticated) {
        setUser(response.data.userInfo);
        console.log("setUser(response.data.userInfo): ", response.data.userInfo);

        console.log("response.data.userInfo: ", response.data.userInfo);
        console.log("checkLoggedInUser");
        setLoading(false);
      } else {
        setLoading(false);;
      }
    } catch (error) {
      console.error('Error checking logged-in user:', error);
    }
  };
  
  const checkLinked = async () => {
    try {

      // ensure the user is logged in before checking linked user
      if (user) {
        const response = await api.get('links/checkLinked');
        setLinked(response.data.linked);
        const { id: partnerId, email: partnerEmail, username: partnerUsername } = response.data.partner;
        setPartner({ id: partnerId, email: partnerEmail, username: partnerUsername });
      } else {
        console.log("no user");
      }
    } catch (error) {
      console.error('Error checking linked user:', error);
    }
  };

  // Effect to check for logged-in user on initial load
  useEffect(() => {
    checkSession();
  }, []);

  // Check if user is linked with another user
  useEffect(() => {
    checkLinked();
  }, [user]);
    


  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home handleLogout={handleLogout} user={user} loading={loading} linked={linked} partner={partner} api={api}/>,
    },
    {
      path: '/login',
      element: <Login api={api} setUser={setUser} setLinked ={setLinked} setPartner={setPartner}/>,
    },
    {
      path: '/signup',
      element: <Signup api={api}/>,
    },
    {
      path: '*',
      element: <NoPage />,
    }, 
    {
      path: '/to-me',
      element: <ToMe handleLogout={handleLogout} user={user} loading={loading} setUser={setUser} partner={partner} api={api}/>,
    },
    {
      path: '/to-ta',
      element: <ToTa handleLogout={handleLogout} user={user} loading={loading} setUser={setUser} api={api}/>,
    },

    // redirect to home page if not logged in
    {
      path: '/link',
      element: user ? <Link setLinked={setLinked} linked={linked} handleLogout={handleLogout} user={user} loading={loading} api={api}
        setPartner={setPartner}/>
      : <Navigate to="/" />
    }
  ]);
  
  return (
    <RouterProvider router={router} />
  )
}

export default App;