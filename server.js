const express = require('express');
const db = require('./db');
const personRoutes = require('./Routes/personRoutes');
const menuRoutes = require('./Routes/menuRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT);

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send("Welcome to my hotel");
})


app.use('/person', personRoutes);
app.use('/menu', menuRoutes);


