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
    let conn;
    let commits;
    let user;
    try {
        conn = await pool.getConnection();
        console.log("after conn")
        user = await conn.query("SELECT `userID` FROM `Users` WHERE `sessionID`=?", [req.sessionID]);
        console.log(user[0].userID);
        commits = await conn.query("SELECT `commitID`, `commitName`, `parentTaskID`, `commitMessage`, `timeWorked`, `committingUserID`, `commitCompleted`, `commitTime` FROM `Commits` c JOIN `UserAccessibleTasks` uat ON c.parentTaskID=uat.taskID WHERE uat.userID=?", [1]);
        delete commits.meta;
        console.log("after query");

    } catch (err) {
        console.log(err)
        throw err;
    } finally {

        console.log("sessionID: ", req.sessionID)

        res.status(201);
        res.json(commits);

        if (conn) return conn.end();
    }
});

router.post("/create", async (req, res) => {

    let conn;
    let commit;
    try {
        conn = await pool.getConnection();
        console.log("after conn")
        user = await conn.query("SELECT `userID` FROM `Users` WHERE `sessionID`=?", [req.sessionID]);
        console.log("CREATING COMMIT USER ID: ", user[0].userID);
        commit = await conn.query("INSERT INTO `Commits` VALUES (?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE `commitName`=VALUES(`commitName`), `commitMessage`=VALUES(`commitMessage`), `parentTaskID`=VALUES(`parentTaskID`), `timeWorked`=VALUES(`timeWorked`), `committingUserID`=VALUES(`committingUserID`), `commitCompleted`=VALUES(`commitCompleted`), `commitTime`=VALUES(`commitTime`)", [req.body.commitId, req.body.commitName, req.body.taskId, req.body.commitDescription, req.body.commitWorkCompleted, req.body.commitReporter, req.body.commitCompleted, req.body.commitTimestamp])
        console.log("after query");

    } catch (err) {
        console.log(err)
        throw err;
    } finally {
        res.status(201);
        res.json(commit);

        if (conn) return conn.end();
    }
});

module.exports = router;