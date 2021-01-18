const express = require("express");
const router = express.Router();

let users = require("../dummyDatabase");

router.get("/list", async (req, res) => {
    try {
        res.status(200).json({
            data: users
        });
    } catch (err) {
        res.status(400).json({
            message: "Error retrieving list of users",
            err
        });
    }
});

module.exports = router;