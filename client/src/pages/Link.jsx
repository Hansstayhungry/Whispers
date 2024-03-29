import React, { useState, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import '../styles/Link.scss';
import axios from "axios";

const Link = (props) => {

  // redirect to main page using react router dom
  const navigate = useNavigate();
  
  const {handleLinked, setLinked, linked, user, handleLogout, loading} = props;

  // manage code state when invitee input the code they received
  const [code, setCode] = useState("");

  // manage disable state for re-generate code button
  const [disabled, setDisabled] = useState(true);

  // manage form data state
  const [inviteeEmail, setinviteeEmail] = useState();

  const [verifyCode, setVerifyCode] = useState();

  // get warning message from server if invitee email is not registered
  const [warning, setWarning] = useState();

  // set warning message to link form
  const [warningLink, setWarningLink] = useState();

  // set successful message when link is successful
  const [linkSuccess, setLinkSuccess] = useState();

  // handle input change
  const handleLinkFormChange = (e) => {
    setinviteeEmail(e.target.value);
  }

  // handle link process
  const handleLinkFormSubmit = (e) => {
    e.preventDefault();

    axios.post('/invitations/create', {inviteeEmail: inviteeEmail})
      .then((response) => {
        if (response.data.warning) {
          setWarning(response.data.warning);
        } else {
          setCode(response.data.code);
          setDisabled(true);
          setCountdown(60);          
        }
      })
      .catch(error => {
        console.error('Error when creating invitation:', error);
      });
  }


  // handle code form change
  const handleCodeChange = (e) => {
    setVerifyCode(e.target.value);
  }

  // handle invitee code submit
  const handleCodeSubmit = (e) => {
    e.preventDefault();
    console.log("Target", e.target);
    // get invitee user id by email


    axios.post('/invitations/verify', {verifyCode: verifyCode})
      .then((data) => {
        if (data.error) {
          setWarningLink(data.error);
        } else {
          setWarningLink();
          setLinkSuccess(data.message);
          setLinked(true);
          handleLinked();

          // redirect to home page after all process is done
          navigate('/');
        }
      })
      .catch(error => {
        console.error('Error when verifying invitation:', error);
      });
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
      <Header user={user} handleLogout={handleLogout} loading={loading}/>
      {!linked ? (
        <div className="link-container">
          <h1>Manage Link</h1>
          <p>Link with your partner by generating a unique invitation code to start writing posts</p>
          <form onSubmit={handleLinkFormSubmit} className="link-form">
            <input type="email" name="inviteeEmail" value={inviteeEmail} onChange={handleLinkFormChange} placeholder="Enter your partner's email"></input>
            <p>{warning}</p>
            {!code ? (
              <button type="submit">GENERATE</button>
            ) : (
              <div>
                <p>Here is the code. Please share it with your partner.</p>
                <h2>{code}</h2>
                <h2>The code will expire in {countdown} seconds</h2>
                <p>Re-generate a new code</p>
                <button type="submit" disabled={disabled}>RE-GENERATE</button>
              </div>
            )}
          </form>
          {!code && (<div>
            <p>Have an invitation code? Enter it below now.</p>
          <form onSubmit={handleCodeSubmit} className="link-verification-form">
            <input type="text" onChange={handleCodeChange} placeholder="Enter your invitation code"></input>
            <p>{warningLink}</p>
            <button type="submit">Link</button>
          </form>
          </div>)}
        </div>      
      ) : (
        <div className="link-container">
          <h1>Manage Link</h1>
          <p>You have successfully linked with your partner</p>
          <p>Want to disconnect? click un-linked below</p>
        </div>
      )}
    </div>  
  );
  
}

export default Link;