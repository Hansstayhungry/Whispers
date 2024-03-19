import React from "react";
import "../styles/Header.scss";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = (props) => {

  const {handleLogout, user} = props;

  // handle login state


  // handle logout state


  return (<header className="header-container">
    <Link to="/" className="main-page-link" style={{ textDecoration: 'none' }}>
      <h1>Keep</h1>
    </Link>
    {/* use Link - react router instead of a href to avoid full page reload */}

    {/* // conditional rendering of login/logout button */}
    <div className="sign-container">
      <span className="buttonGroup">
        {!user ? (
          <div><Button component={Link} to="/login" className="MuiLink-button">
            Login
          </Button><Button component={Link} to="/signup" className="MuiLink-button">
              Signup
            </Button></div>
        ) : (
          <Button component={Link} to="/" onClick={handleLogout} className="MuiLink-button">
            Logout
          </Button>          
        )}
      </span>
    </div>
  </header>)
}

export default Header;
