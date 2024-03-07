import React from "react";
import "../styles/Footer.scss";

const Footer = () => {
  const date = new Date ();
  const currentYear = date.getFullYear();
  return (<footer className="footerContainer">
      <p>Copyright {currentYear}</p>
    </footer>)
}

export default Footer;
