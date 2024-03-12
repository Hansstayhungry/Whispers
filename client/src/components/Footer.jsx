import React from "react";
import "../styles/Footer.scss";

const Footer = () => {
  const date = new Date ();
  const currentYear = date.getFullYear();
  return (
    <footer className="footer-container">
      <p>Made by @HansStayHungry with LOVE</p>
      <p>Copyright {currentYear}</p>
    </footer>)
}

export default Footer;
