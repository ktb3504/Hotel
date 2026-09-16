const express = require('express');

const app = express();

app.listen(3000);

app.get('/', (req, res) => {
    res.send('<p>Hello</p>');
})

app.get('/about', (req, res) =>{
    res.sendFile('./views/about.html', {root : __dirname});
})

app.get('/index', (req, res) => {
    res.sendFile('./views/index.html', {root : __dirname})
})

app.get('/about-us', (req, res) => {
    res.redirect('/about');
})

console.log(app);
app.use((req, res) => {
    res.sendFile('./views/404.html', {root : __dirname});
})



