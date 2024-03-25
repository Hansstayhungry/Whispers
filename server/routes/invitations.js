import express from 'express';
import users from '../db/queries/invitations.js';
import bcrypt from 'bcrypt';
import invitations from '../db/queries/invitations.js';

const router = express.Router();

// to manage code creation by getting inviter and invitee id
router.post("/create", async(req, res) => {

  // getting invitee email from cleint side form
  const { inviteeEmail, code } = req.body;

  // getting inviter info from session, and deconstrcut
  const { id: inviterId, username: inviterUsername, email: inviterEmail } = req.session.user;

  try {
    // feed info to createLink function
    const invitee = await users.getUserByEmail(inviteeEmail);

    if (!invitee || invitee.length === 0) {
      return res.json({ error: 'Your partner has not registgered yet, please inform ta to register first' });
    }
    const newLink = await invitations.createLink(inviterEmail, inviteeEmail, code);
    res.json({ linkIsSent: true, message: 'invitation sent successfully' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error'});
  }
});

// to manage code verification by comparing if code received and email match in invite form
router.post("/verification", async(req, res) => {

  const { email, password } = req.body

  try {
    const user = await users.getUserByEmail(email);

    // If no user found with the given email
    if (!user || user.length === 0) {
      return res.json({ error: 'Invalid email or password' });
    }
    const userHashedPassword = user[0].password;
    const userId = user[0].id;
    const username = user[0].username;
    const useremail = user[0].email;

    const match = await bcrypt.compare(password, userHashedPassword);

    // sending extra match data for tracking incorrect password error
    if (match) {
      // set session data
      req.session.user = {
        id: userId,
        username: username,
        email: useremail
      }
      console.log('user logged in:', req.session.user);
      res.json({ isLogin: true, userInfo: req.session.user, message: 'login successful' });
    } else {
      res.json({ message: 'invalid email or password' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error'});
  }
});

// check if user is logged in when refresh the home page
router.get("/checkLoggedInUser", (req, res) => {
  console.log("sent")
  if (req.session.user) {
    console.log('user:', req.session.user);
    res.json({ user: req.session.user });
  } else {
    res.json({ user: null});
  }
});

// clear cookies and session data when user logs out
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: 'logout successful' });
});

export default router;