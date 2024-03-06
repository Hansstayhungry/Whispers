import React from "react";
import "../styles/Header.scss";

const Header = () => {
  return (<header className="header-container">
    <h1>Keeper</h1>
    <button>Sign up</button>
    <button>Sign in</button>
    <button>Sign out</button>
  </header>)
}

export default Header;
