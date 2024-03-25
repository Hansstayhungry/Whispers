import React, { useState, useReducer, useEffect } from "react";
import Header from "../components/Header";
import '../styles/Link.scss';

const Link = (props) => {
  
  const {handleLink, link, user, handleLogout} = props;

  const [code, setCode] = useState("");

  // handle link
  const handleInvite = () => {
    const code = generateCode();

  }

  //gernerate a code for linking
    
  const generateCode = () => {
    let code = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 8; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  }

  // set countown
  const [countdown, setCountdown] = useState(60);

  // set disabled state for re-generate code button
  const [disabled, setDisabled] = useState(true);
  
  return (
    <div>
      <Header user={user} handleLogout={handleLogout}/>
      <div className="link-container">
        <h1>Manage Link</h1>
        <p>Link with your partner to start sending messages</p>
        <form className="link-form">
          <input type="text" placeholder="Enter your partner's email"></input>
          {!code ? (
            <button onClick={handleInvite}>Link</button>
          ) : (
            <div>
              <p>Here is the code. Please share it with your partner.</p>
              <h2>{code}</h2>
              <h2>The code will expire in {countdown} seconds</h2>
              <p>Time is up? Need to re-generate a new code?</p>
              <button onClick={handleInvite} disabled={disabled}>Link</button>
            </div>
          )}
        </form>
        <p>Have an invitation code? Enter it below now.</p>
        <form className="link-verification-form">
          <input type="text" placeholder="Enter your invitation code"></input>
          <button onClick={handleLink}>Link</button>
        </form>
      </div>
    </div>
  );
  
}

export default Link;