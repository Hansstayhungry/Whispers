import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './index.scss';
import reportWebVitals from './reportWebVitals';

// refer to official document
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// use useReducer to handle login logout state
const initialTasks = {isLogin: false};

const taskReducer = function(tasks, action) {
  switch (action.type) {
    case 'LOGIN': {
      return [...tasks, {
        isLogin: true
      }]
    }
    case 'LOGOUT': {
      return [...tasks, {
        isLogin: false
      }]
    }
  }
}

const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

const handleLogin = function() {
  dispatch({type: 'LOGIN'});
}

const handleLogout = function() {
  dispatch({type: 'LOGOUT'});
}


// set up react-router for multipage support

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/home" element={<App tasks={tasks} handleLogin={handleLogin} handleLogout={handleLogout}/>} />
      <Route path="/login" element={<Login handleLogin={handleLogin}/>} />
      <Route path="/signup" element={<Signup handleLogin={handleLogin}/>} />
    </Route>
  )
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
