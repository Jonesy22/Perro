const express = require('express');
const path = require('path');
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

app.get('/ping', (req, res) => {
    return res.send('pong');
})

app.listen(port, () =>
    console.log('Perro listening on port 5000!'),
);

module.exports = app;