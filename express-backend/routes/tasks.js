const pool = require("../dbPool");

const express = require("express");
const router = express.Router();

router.get("/get", async (req, res) => {
    let conn;
    let tasks;
    let teamTasks;
    let tat;
    let user;
    try {
        conn = await pool.getConnection();
        console.log("after conn")
        user = await conn.query("SELECT `userID`, `email` FROM `Users` WHERE `sessionID`=?", [req.sessionID]);
        console.log(user[0].userID);
        // tasks = await conn.query("SELECT t.`taskID`, `parentID`, `tname`, `timeEstimate`, `summary`, `description`, `dueDate` FROM `Tasks` t JOIN `UserAccessibleTasks` uat ON t.taskID=uat.taskID WHERE uat.userID=?", [1]);
        tasks = await conn.query("SELECT t.`taskID`, `parentID`, `tname`, `timeEstimate`, `summary`, `description`, `dueDate`, t.`userId` FROM `Tasks` t JOIN `UserAccessibleTasks` uat ON t.taskID=uat.taskID WHERE uat.userID=?", [user[0].userID]);
        teamTasks = await conn.query("SELECT t.`taskID`, `parentID`, `tname`, `timeEstimate`, `summary`, `description`, `dueDate`, t.`userId` FROM `Tasks` as t WHERE `taskID` IN (SELECT `taskID` FROM `TeamsAccessibleTasks` WHERE `teamID` IN (SELECT `teamID` FROM `TeamUsers` WHERE `userEmail` = ? AND `acceptedInvite`=1))", [user[0].email]);
        tat = await conn.query("SELECT t.`teamID`, t.`taskID` FROM `TeamsAccessibleTasks` as t WHERE `teamID` IN (SELECT `teamID` FROM `TeamUsers` WHERE `userEmail` = ?)", [user[0].email]);
        delete tasks.meta;
        delete teamTasks.meta;
        delete tat.meta
        console.log("after query");

    } catch (err) {
        console.log(err)
        throw err;
    } finally {

        console.log("sessionID: ", req.sessionID)

        res.status(201);
        res.json({tasks: tasks.concat(teamTasks), teamAccessibleTasks: tat});

        if (conn) return conn.end();
    }
});

router.post("/shareTeam", async (req, res) => {

    let conn;
    let values
    try {
        conn = await pool.getConnection();
        console.log("after conn")
        user = await conn.query("SELECT `userID` FROM `Users` WHERE `sessionID`=?", [req.sessionID]);
        if(!req.body.taskId) {
            values = []
            for(const i in req.body.taskIdList) {
                values.push(new Array(Number(req.body.teamId), req.body.taskIdList[i]))
            }

            if (req.body.taskIdList.length > 0) {
                try {
                    conn.batch("INSERT IGNORE INTO `TeamsAccessibleTasks` (`teamID`, `taskID`) VALUES (?, ?)",values);
                    conn.commit();
                } catch (err) {
                    conn.rollback();
                }
            }
        }
        console.log("after query");

    } catch (err) {
        console.log(err)
        throw err;
    } finally {
        res.status(201);
        res.json(values);

        if (conn) return conn.end();
    }
});

router.post("/removeShareTeam", async (req, res) => {

    let conn;
    let values;
    let tat;
    try {
        conn = await pool.getConnection();
        console.log("after conn")
        user = await conn.query("SELECT `userID` FROM `Users` WHERE `sessionID`=?", [req.sessionID]);
        if(!req.body.taskId) {
            values = []
            for(const i in req.body.taskIdList) {
                values.push(new Array(Number(req.body.teamId), req.body.taskIdList[i]))
            }

            if (req.body.taskIdList.length > 0) {
                try {
                    tat = await conn.query("DELETE FROM `TeamsAccessibleTasks` WHERE `teamID`=? AND `taskID` IN (?)", [req.body.teamId, req.body.taskIdList]);
                    delete tat.meta
                } catch (err) {
                    console.log(err)
                    // conn.rollback();
                }
            }
        }
        console.log("after query");

    } catch (err) {
        console.log(err)
        throw err;
    } finally {
        res.status(201);
        res.json(values);

        if (conn) return conn.end();
    }
});

router.post("/create", async (req, res) => {

    let conn;
    let task;
    let uat;
    let values = [];
    try {
        conn = await pool.getConnection();
        console.log("after conn")
        user = await conn.query("SELECT `userID` FROM `Users` WHERE `sessionID`=?", [req.sessionID]);
        console.log(user)
        console.log(req.sessionID)
        task = await conn.query("INSERT INTO `Tasks` VALUES (?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE `parentID`=VALUES(`parentID`), `tname`=VALUES(`tname`), `userId`=VALUES(`userId`), `timeEstimate`=VALUES(`timeEstimate`), `summary`=VALUES(`summary`), `description`=VALUES(`description`), `dueDate`=VALUES(`dueDate`)", [req.body.taskId, req.body.parentId, req.body.Name, req.body.Estimate, req.body.Summary, req.body.Description, req.body.DueDate.substring(0, 10), req.body.userId])
        
        if(task.insertId) {
            // uat = await conn.query("INSERT INTO `UserAccessibleTasks` VALUES (?, ?)", [1, task.insertId])
            uat = await conn.query("INSERT INTO `UserAccessibleTasks` VALUES (?, ?)", [user[0].userID, task.insertId])
            console.log(req.body.teamIdList);
            for(const i in req.body.teamIdList) {
                values.push(new Array(Number(req.body.teamIdList[i]), task.insertId));
            }

            if (req.body.teamIdList.length > 0) {
                try {
                    conn.batch("INSERT IGNORE INTO `TeamsAccessibleTasks` (`teamID`, `taskID`) VALUES (?, ?)",values);
                    conn.commit();
                } catch (err) {
                    conn.rollback();
                }
            }
        }
        console.log("after query");

    } catch (err) {
        console.log(err)
        throw err;
    } finally {
        task.values = values;
        res.status(201);
        res.json(task);

        if (conn) return conn.end();
    }
});

router.post("/delete", async (req, res) => {

    let conn;
    let task;
    let updateParents
    try {
        conn = await pool.getConnection();
        console.log("after conn")
        user = await conn.query("SELECT `userID` FROM `Users` WHERE `sessionID`=?", [req.sessionID]);
        console.log("MODE " + req.body.mode + " DELETING TASK USER ID: ", user[0].userID);

        // move subtasks to parent
        if(req.body.mode === 1) {
            let newParentId = await conn.query("SELECT `parentID` FROM `Tasks` WHERE `taskID`=?", [req.body.taskId])
            updateParents = await conn.query("UPDATE `Tasks` SET `parentID`=? WHERE `parentID`=?", [newParentId[0].parentID, req.body.taskId]);
            task = await conn.query("DELETE FROM `Tasks` WHERE `taskID`=?", [req.body.taskId])
        }
        // delete all subtasks
        else if(req.body.mode === 0) {
            task = await conn.query("DELETE FROM `Tasks` WHERE `taskID`=?", [req.body.taskId])
        }
        console.log("after query");

    } catch (err) {
        console.log(err)
        throw err;
    } finally {
        res.status(201);
        // res.json(task);
        res.json(task);

        if (conn) return conn.end();
    }
});

module.exports = router;