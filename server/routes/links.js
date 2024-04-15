import express from 'express';
import invitations from '../db/queries/invitations.js';
import links from '../db/queries/links.js';
import users from '../db/queries/users.js';

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
    const invitee = await links.getUserByEmail(inviteeEmail);
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
      res.json({ linkIsSent: true, message: 'invitation sent successfully' });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error'});
  }
});

// to manage code verification by comparing if code received and email match in invite form
router.post("/verify", async(req, res) => {

  // get received code from client side
  const { verifyCode: receivedCode } = req.body
  console.log("receivedCode", receivedCode);

  // now get invitee info from session
  const { id: inviteeId, username: inviteeUsername, email: inviteeEmail } = req.session.user;

  try {

    // get inviterId by validation code
    const inviter = await invitations.getInviterIdByCode(receivedCode);
    const inviterId = inviter['inviterid'];
    console.log("inviterId", inviterId);

    // now we have all data needed to feed to getRelations function
    const data = await invitations.getRelations(receivedCode, inviterId, inviteeId);
    if (!data || data.length === 0) {
      console.log("stop at if");
      return res.json({ error: 'Invalid code' });
    } else if (data[0].inviteeid !== inviteeId || data[0].expired_at < new Date()) {
      console.log("data[0].inviteeid", data[0].inviteeid, "inviteeId", inviteeId, "data[0].expired_at", data[0].expired_at, "new Date()", new Date());
      console.log("stop at else if");
      return res.json({ error: 'Invalid code' });
    } else {
      const newRelation = await links.createRelations(inviterId, inviteeId);
      console.log("newRelation", newRelation)
      res.json({ codeIsMatched: true, message: 'Code matched!' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error'});
  }
});

// manage to unlink users
router.delete("/unlink/:id", async(req, res) => {
  const { id } = req.params;
  try {
    await links.deleteRelations(id);
    res.json({ message: 'Unlinked successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error'});
  }
});

router.get("/checkLinked", async(req, res) => {
  try {
    let user_id;
    if (req.session.user) {
      user_id = req.session.user.id;
    } else {
      return res.json({ linked: false });
    }

    const data = await links.getRelations(user_id);
    if ( data.length !== 0) {
      const partner = await users.getUserById(data[0].partner_id);
      res.json({ linked: true, partner: partner[0]});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error'});
  }
})

export default router;