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

router.post("/create", async (req, res) => {

    let conn;
    let task;
    let uat;
    try {
        conn = await pool.getConnection();
        console.log("after conn")
        user = await conn.query("SELECT `userID` FROM `Users` WHERE `sessionID`=?", [req.sessionID]);
        task = await conn.query("INSERT INTO `Tasks` VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE `parentID`=VALUES(`parentID`), `tname`=VALUES(`tname`), `timeEstimate`=VALUES(`timeEstimate`), `summary`=VALUES(`summary`), `description`=VALUES(`description`), `dueDate`=VALUES(`dueDate`)", [req.body.taskId, req.body.parentId, req.body.Name, req.body.Estimate, req.body.Summary, req.body.Description, req.body.DueDate])
        if(!req.body.taskId) {
            // uat = await conn.query("INSERT INTO `UserAccessibleTasks` VALUES (?, ?)", [user[0].userID, task.insertId])
            uat = await conn.query("INSERT INTO `UserAccessibleTasks` VALUES (?, ?)", [1, task.insertId])
        }
        console.log("after query");

    } catch (err) {
        console.log(err)
        throw err;
    } finally {
        res.status(201);
        res.json(task);

        if (conn) return conn.end();
    }
});

router.post("/delete", async (req, res) => {

    let conn;
    let task;
    try {
        conn = await pool.getConnection();
        console.log("after conn")
        user = await conn.query("SELECT `userID` FROM `Users` WHERE `sessionID`=?", [req.sessionID]);
        console.log("DELETING TASK USER ID: ", user[0].userID);
        task = await conn.query("DELETE FROM `Tasks` WHERE `taskID`=?", [req.body.taskId])
        console.log("after query");

    } catch (err) {
        console.log(err)
        throw err;
    } finally {
        res.status(201);
        res.json(task);

        if (conn) return conn.end();
    }
});

module.exports = router;