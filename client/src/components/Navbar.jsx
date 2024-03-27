import React from "react";
import "../styles/Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = (props) => {

  const {user} = props;
  return (
    <nav className="navbar-container">
      <div className="nav-links">
        <Link to="/to-me">{user.username}'s Inbox/ RECEIVED</Link>
        <Link to="/to-ta">To ta's inbox / SENT</Link>
      </div>
    </nav>
  )
}

export default Navbar;