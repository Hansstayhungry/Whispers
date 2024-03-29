import express from 'express';
import users from '../db/queries/invitations.js';
import bcrypt from 'bcrypt';
import invitations from '../db/queries/invitations.js';

const router = express.Router();

// to manage code creation by getting inviter and invitee id
router.post("/create", async(req, res) => {
  //gernerate a code for linking
  const generateCode = () => {
    let code = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 8; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  }

  const code = generateCode();

  // getting invitee email from cleint side form
  const { inviteeEmail } = req.body;
  console.log("inviteeEmail", inviteeEmail);

  // getting inviter info from session, and deconstrcut
  const { id: inviterId, username: inviterUsername, email: inviterEmail } = req.session.user;
  console.log("inviterId", inviterId, "inviterUsername", inviterUsername, "inviterEmail", inviterEmail);

  try {
    // feed info to createLink function
    const invitee = await users.getUserByEmail(inviteeEmail);
    console.log("invitee", invitee);
    if (!invitee || invitee.length === 0) {
      return res.json({ warning: 'Your partner has not registgered yet, please inform ta to register first' });
    } else if (invitee[0].id === inviterId) {
      return res.json({ warning: 'You cannot invite yourself.' });
    } else {
      const inviteeId = invitee[0].id;
      console.log("inviteeId", inviteeId);
      console.log("code", code);
      
      const newLink = await invitations.createLink(inviterId, inviteeId, code);
      res.json({ linkIsSent: true, message: 'invitation sent successfully', code: code});
    }

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

    // get inviterId by validation code
    const inviterId = await invitations.getInviterIdByCode(receivedCode);

    // now we have all data needed to feed to getRelations function
    const data = await invitations.getRelations(receivedCode, inviterId, inviteeId);
    if (!data || data.length === 0) {
      return res.json({ error: 'Invalid code' });
    // } else if (data[0].inviteeId !== inviteeId || data[0].expired_at < new Date.now()) {
    //   return res.json({ error: 'Invalid code' });
    } else {
      res.json({ codeIsMatched: true, message: 'Parnter linked successfully' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error'});
  }
});

export default router;