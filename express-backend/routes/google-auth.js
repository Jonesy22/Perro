const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client('135401201253-5dd1qt8cqq3qh4h3jfnibkcclkrs8l2g.apps.googleusercontent.com')
const pool = require("../dbPool");

const express = require("express");
const router = express.Router();

router.post("/google", async (req, res) => {
    const { token }  = req.body
    console.log("token: ", req.body);

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.REACT_APP_CLIENT_ID,
    });
    // const { name, email, picture } = ticket.getPayload(); 
    // console.log(ticket.getPayload());
    // console.log(ticket.getUserId());
    let conn;
    let user;
    try {
        conn = await pool.getConnection();
        console.log("after conn")
        user = await conn.query("INSERT INTO `Users` VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE `sessionID`=?", [ticket.getUserId(), req.body.token, req.sessionID, ticket.getPayload().given_name, ticket.getPayload().family_name, ticket.getPayload().email, req.sessionID]);
        console.log(user); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

        console.log("after query");

    } catch (err) {
        console.log(err)
        throw err;
    } finally {

        req.session.cookie.userId = user.userID;
        // console.log(req.session)    
        console.log("sessionID: ", req.sessionID)

        res.status(201);
        res.json(user);

        if (conn) return conn.end();
    }
})

// test route that prints out the session for testing
router.post("/test", async(req, res) => {
    console.log("--------------------------")
    console.log(req.sessionID)
    res.status(201);
})

router.delete("/logout", async (req, res) => {
    await req.session.destroy()
    res.status(200)
    res.json({
        message: "Logged out successfully"
    })
})

module.exports = router;