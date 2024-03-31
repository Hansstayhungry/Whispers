import React from "react";
import "../styles/Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = (props) => {

  const {user, partner} = props;
  return (
    <nav className="navbar-container">
      <div className="nav-links">
        {partner && <Link to="/to-me" className="nav-link">{user.username}'s Inbox/ RECEIVED</Link>}
        <Link to="/to-ta" className="nav-link">To {partner ? partner.username : 'ta'}'s inbox / SENT</Link>
      </div>
    </nav>
  )
}

export default Navbar;