const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: 'classmysql.engr.oregonstate.edu', 
     database: 'capstone_2021_group60',
     user:'capstone_2021_group60', 
     password: 'Perro109*',
     connectionLimit: 5
});

const express = require("express");
const router = express.Router();

// SELECT * FROM `Users` WHERE `email` IN (SELECT `userEmail` FROM `TeamUsers` WHERE `teamID` IN (SELECT `teamID` FROM `TeamUsers` WHERE `userEmail`="jonetrev@oregonstate.edu"	))
router.get("/accessibleUsers", async (req, res) => {
    let conn;
    let teamUsers;
    let user;
    try {
        conn = await pool.getConnection();
        console.log("after conn")
        user = await conn.query("SELECT `userID`, `email` FROM `Users` WHERE `sessionID`=?", [req.sessionID]);
        teamUsers = await conn.query("SELECT `userID`, `email`, `fname`, `lname` FROM `Users` WHERE `email` IN (SELECT `userEmail` FROM `TeamUsers` WHERE `teamID` IN (SELECT `teamID` FROM `TeamUsers` WHERE `userEmail`=?))", [user[0].email]);
        delete teamUsers.meta;
        console.log("after query");

    } catch (err) {
        console.log(err)
        throw err;
    } finally {

        res.status(201);
        res.json(teamUsers);

        if (conn) return conn.end();
    }
});

module.exports = router;