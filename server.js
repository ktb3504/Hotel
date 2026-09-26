const express = require('express');
const db = require('./db');
const personRoutes = require('./Routes/personRoutes');
const menuRoutes = require('./Routes/menuRoutes');
const passport = require('./auth');

const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT); 

app.use(passport.initialize());

const bodyParser = require('body-parser');
const { ModifiedPathsSnapshot } = require('mongoose');
app.use(bodyParser.json());

const consoleLog = (req, res, next) =>{
    console.log(`${[new Date().toLocaleString()]} Request made to ${req.originalUrl}`);
    next();
}

const localAuthMiddlewear = passport.authenticate('local', {session : false});
app.get('/', localAuthMiddlewear, (req, res) => {
    res.status(200).send("Welcome to my hotel");
})


app.use('/person', localAuthMiddlewear, personRoutes);
app.use('/menu', menuRoutes);


