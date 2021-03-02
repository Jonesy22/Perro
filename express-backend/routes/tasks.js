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

router.get("/get", async (req, res) => {
    const { token }  = req.body
    console.log("token: ", req.body);

    // const ticket = await client.verifyIdToken({
    //     idToken: token,
    //     audience: process.env.REACT_APP_CLIENT_ID,
    // });

    // const { name, email, picture } = ticket.getPayload(); 
    // console.log(ticket.getPayload());
    // console.log(ticket.getUserId());
    let conn;
    let tasks;
    let user;
    try {
        conn = await pool.getConnection();
        console.log("after conn")
        user = await conn.query("SELECT `userID` FROM `Users` WHERE `sessionID`=?", [req.sessionID]);
        console.log(user[0].userID);
        // tasks = await conn.query("SELECT t.`taskID`, `parentID`, `tname`, `timeEstimate`, `summary`, `description` FROM `Tasks` t JOIN `UserAccessibleTasks` uat ON t.taskID=uat.taskID WHERE uat.userID=?", [user[0].userID]);
        tasks = await conn.query("SELECT t.`taskID`, `parentID`, `tname`, `timeEstimate`, `summary`, `description`, `dueDate` FROM `Tasks` t JOIN `UserAccessibleTasks` uat ON t.taskID=uat.taskID WHERE uat.userID=?", [1]);
        delete tasks.meta;
        console.log("after query");

    } catch (err) {
        console.log(err)
        throw err;
    } finally {

        console.log("sessionID: ", req.sessionID)

        res.status(201);
        res.json(tasks);

        if (conn) return conn.end();
    }
});

module.exports = router;