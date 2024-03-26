import React, { useState, useReducer, useEffect } from "react";
import Header from "../components/Header";
import '../styles/Link.scss';
import axios from "axios";

const Link = (props) => {
  
  const {handleLink, link, user, handleLogout} = props;

  const [code, setCode] = useState("");

  // manage disable state for re-generate code button
  const [disabled, setDisabled] = useState(true);

  // manage form data state
  const [formData, setFormData] = useState({
    inviteeEmail: ''
  });

  // handle input change
  const handleChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setFormData( prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  // handle link process
  const handleSubmit = (e) => {
    e.preventDefault();

    //get invitee email input:
    const inviteeEmail = e.target.inviteeEmail.value;

    const code = generateCode();
    axios.post('/invitations/create', {inviteeEmail: inviteeEmail, code: code})
      .then(() => {
        setCode(code);
        setDisabled(true);
        setCountdown(60);
      })
      .catch(error => {
        console.error('Error when creating invitation:', error);
      });
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
  const [countdown, setCountdown] = useState();

  // useEffect to manage countdown
  useEffect(() => {
    if (countdown === 0) {
      // when countdown is 0, reset code and disabled state to false
      setCode();
      setDisabled(false);
      return;
    } else {
      const interval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);

      // clear interval when countdown is 0
      return () => clearInterval(interval);
    }
  }, [countdown]);

  
  return (
    <div>
      <Header user={user} handleLogout={handleLogout}/>
      <div className="link-container">
        <h1>Manage Link</h1>
        <p>Link with your partner by generating a unique invitation code to start writing posts</p>
        <form onSubmit={handleSubmit} className="link-form">
          <input type="email" name="inviteeEmail" value={formData.inviteeEmail} onChange={handleChange} placeholder="Enter your partner's email"></input>
          {!code ? (
            <button type="submit">GENERATE</button>
          ) : (
            <div>
              <p>Here is the code. Please share it with your partner.</p>
              <h2>{code}</h2>
              <h2>The code will expire in {countdown} seconds</h2>
              <p>Time is up? Need to re-generate a new code?</p>
              <button type="submit" disabled={disabled}>RE-GENERATE</button>
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