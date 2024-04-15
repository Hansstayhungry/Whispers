import React from "react";
import "../styles/Header.scss";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/images/logo.png"

const Header = (props) => {

  const {handleLogout, user, loading} = props;

  return (<header className="header-container">
    <Link to="/" className="main-page-link" style={{ textDecoration: 'none' }}>
      <img src={logo} alt="logo" className="logo"/>
      <h1>Whispers</h1>
    </Link>
    {/* use Link - react router instead of a href to avoid full page reload */}

    {/* // conditional rendering of login/logout button */}
    {!loading && (<div className="sign-container">
      <span className="buttonGroup">
        {localStorage.getItem("isLoggedIn") ? (
          <div>
          <h2>{user.email}</h2>
          <Button id="link" component={Link} to="/link" className="MuiLink-button">
          Link
          </Button>

          <Button component={Link} to="/" onClick={handleLogout} className="MuiLink-button">
            Logout
          </Button></div>         
        ) : (
          <div><Button component={Link} to="/login" className="MuiLink-button">
            Login
          </Button><Button component={Link} to="/signup" className="MuiLink-button">
              Signup
            </Button></div>
        ) }
      </span>
    </div>)}
  </header>)
}

export default Header;
