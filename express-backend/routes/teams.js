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

router.post("/create", async (req, res) => {

    let conn;
    let team;
    let teamUser;
    try {
        conn = await pool.getConnection();
        console.log("after conn")
        user = await conn.query("SELECT `userID`, `email` FROM `Users` WHERE `sessionID`=?", [req.sessionID]);
        team = await conn.query("INSERT INTO `Teams` VALUES (?, ?) ON DUPLICATE KEY UPDATE `teamID`=VALUES(`teamID`), `teamName`=VALUES(`teamName`)", [req.body.teamId, req.body.teamName])
        teamUser = await conn.query("INSERT INTO `TeamUsers` VALUES (?, ?, ?, ?)", [team.insertId, user[0].email, true, true])
        console.log("after query");

    } catch (err) {
        console.log(err)
        throw err;
    } finally {
        res.status(201);
        res.json(team);

        if (conn) return conn.end();
    }
});

router.post("/add", async (req, res) => {

    let conn;
    let teamUser;
    try {
        conn = await pool.getConnection();
        console.log("after conn")
        user = await conn.query("SELECT `userID`, `email` FROM `Users` WHERE `sessionID`=?", [req.sessionID]);
        teamUser = await conn.query("INSERT INTO `TeamUsers` VALUES (?, ?, ?, ?)", [req.body.teamId, req.body.email, false, false])
        console.log("after query");

    } catch (err) {
        console.log(err)
        throw err;
    } finally {
        res.status(201);
        res.json(teamUser);

        if (conn) return conn.end();
    }
});

router.post("/delete", async (req, res) => {
    let conn;
    let team;
    try {
        conn = await pool.getConnection();
        console.log("after conn")
        user = await conn.query("SELECT `userID` FROM `Users` WHERE `sessionID`=?", [req.sessionID]);
        team = await conn.query("DELETE FROM `Teams` WHERE `teamID`=?", [req.body.teamId])
        console.log("after query");

    } catch (err) {
        console.log(err)
        throw err;
    } finally {
        res.status(201);
        res.json(team);

        if (conn) return conn.end();
    }
});

module.exports = router;