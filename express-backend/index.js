const express = require('express');
const path = require('path');
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const passport = require('passport');
const mariadb = require('mariadb');
var session = require('express-session')

let sessionOptions = {
    secret: process.env.REACT_APP_CLIENT_SECRET,
    cookie: {
      maxAge:269999999999
    },
    saveUninitialized: true,
    resave:true
};

app.use(session({
    secret: process.env.REACT_APP_CLIENT_SECRET,
    cookie: {
      maxAge:269999999999
    },
    saveUninitialized: true,
    resave:true
}));

const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'build')));
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const googleAuthRouter = require("./routes/google-auth");
app.use("/api/v1/auth/", googleAuthRouter);

app.use(async (req, res, next) => {

    const user = await mariadb.user.findFirst({where: { userID:  req.session.userID }});
    req.user = user;
    next();
})
app.get('/ping', (req, res) => {
    return res.send('pong');
})

app.listen(port, () =>
    console.log('Perro listening on port 5000!'),
);

module.exports = app;