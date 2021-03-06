const express = require('express');
const path = require('path');
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const passport = require('passport');
const mariadb = require('mariadb');
var session = require('express-session')
require('dotenv').config({path:__dirname+'/./../.env'})

app.use(session({
    secret: 'secretidhere',
    cookie: {
      maxAge:269999999999
    },
    saveUninitialized: true,
    resave:true
}));

const port = process.env.PORT || 5000;

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}

app.use(express.static(path.join(__dirname, 'build')));
// app.options('*', cors());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const teamsRouter = require("./routes/teams");
app.use("/teams/", teamsRouter);

const tasksRouter = require("./routes/tasks");
app.use("/tasks/", tasksRouter);

const commitsRouter = require("./routes/commits");
app.use("/commits/", commitsRouter);

const googleAuthRouter = require("./routes/google-auth");
app.use("/api/v1/auth/", googleAuthRouter);

// app.use(async (req, res, next) => {
//     const user = await mariadb.user.findFirst({where: { userID:  req.session.userID }});
//     req.user = user;
//     next();
// })

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })

app.get('/ping', (req, res) => {
    return res.send('pong');
})

app.listen(port, () =>
    console.log('Perro listening on port ' + port),
);

module.exports = app;