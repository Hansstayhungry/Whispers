import express from 'express';
import users from '../db/queries/invitations.js';
import bcrypt from 'bcrypt';
import invitations from '../db/queries/invitations.js';

const router = express.Router();

// to manage code creation by getting inviter and invitee id
router.post("/create", async(req, res) => {

  // getting invitee email from cleint side form
  const { inviteeEmail, code } = req.body;
  console.log("inviteeEmail", inviteeEmail, "code", code);

  // getting inviter info from session, and deconstrcut
  const { id: inviterId, username: inviterUsername, email: inviterEmail } = req.session.user;
  console.log("inviterId", inviterId, "inviterUsername", inviterUsername, "inviterEmail", inviterEmail);

  try {
    // feed info to createLink function
    const invitee = await users.getUserByEmail(inviteeEmail);
    console.log("invitee", invitee);
    const inviteeId = invitee[0].id;
    console.log("inviteeId", inviteeId);
    console.log("code", code);

    if (!invitee || invitee.length === 0) {
      return res.json({ error: 'Your partner has not registgered yet, please inform ta to register first' });
    }
    const newLink = await invitations.createLink(inviterId, inviteeId, code);
    res.json({ linkIsSent: true, message: 'invitation sent successfully' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error'});
  }
});

// to manage code verification by comparing if code received and email match in invite form
router.post("/verify", async(req, res) => {

  // get received code from client side
  const { receivedCode } = req.body

  // now get invitee info from session
  const { id: inviteeId, username: inviteeUsername, email: inviteeEmail } = req.session.user;

  try {

    const data = await invitations.getMatchByCode(receivedCode);
    if (!data || data.length === 0) {
      return res.json({ error: 'Invalid code' });
    } else if (data[0].inviteeId !== inviteeId || data[0].expired_at < new Date.now()) {
      return res.json({ error: 'Invalid code' });
    } else {
      res.json({ codeIsMatched: true, message: 'Parnter linked successfully' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error'});
  }
});

export default router;