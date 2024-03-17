import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Routes, Route, RouterProvider } from 'react-router-dom';
import { create } from '@mui/material/styles/createTransitions';
import { useReducer } from 'react';

// need to wrap inside a react component in order to call react hooks
  const AppRouter = () => {
    
    // PENDING: MOVE TO HOOKS FOLDER, SEPARATION OF CONCERN
    // use useReducer to handle login logout state
    const initialTasks = {isLogin: false};

    const taskReducer = function(tasks, action) {
      switch (action.type) {
        case 'LOGIN': {
          return ({
            isLogin: true,
            userInfo: action.userInfo
          })
        }
        case 'LOGOUT': {
          return {
            isLogin: false
          }
        }
        default: {
          return tasks;
        }
      }
    }

      const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

      const handleLogin = function(userInfo) {
        dispatch({type: 'LOGIN', userInfo});
      }
      
      const handleLogout = function() {
        dispatch({type: 'LOGOUT'});
      }

    {/* // set up react-router for multipage support */}
    const router = createBrowserRouter([
      {
        path: '/',
        element: <App handleLogin={handleLogin} handleLogout={handleLogout} tasks={tasks}/>,
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
