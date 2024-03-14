import React from "react";
import "../styles/Header.scss";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = (props) => {
  // sign in state
  const [signIn, setSignIn] = useState(false)

  // handle header title click, prevent full page reload
  return (<header className="header-container">
    <Link to="/" className="main-page-link" style={{ textDecoration: 'none' }}>
      <h1>Keep</h1>
    </Link>
    {/* use Link - react router instead of a href to avoid full page reload */}
    <div className="sign-container">
      <span className="buttonGroup">
        {!signIn && (
          <div><Button component={Link} to="/login" className="MuiLink-button">
            Login
          </Button><Button component={Link} to="/signup" className="MuiLink-button">
              Signup
            </Button></div>          
        )}
        {signIn && (
          <Button component={Link} to="/logout" className="MuiLink-button">
            Logout
          </Button>          
        )}
      </span>
    </div>
  </header>)
}

export default Header;
