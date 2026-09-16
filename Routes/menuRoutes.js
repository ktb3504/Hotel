const Menu = require('../Models/Menu');
const express = require('express');
const route = express.Router();

route.post('/', async (req, res) => {
    try{
        const data = req.body;
        const menuItem  =  Menu(data);
        const response = await menuItem.save();
        res.status(200).json(response); 
    }
    catch(err){
        console.log(err);
        res.status(500).json({err: 'err'});
    }
})

route.get('/', async (req, res) => {
    try {
        const data = await Menu.find();
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
})

route.get('/:taste', async (req, res) => {
        try{
        const taste = req.params.taste;
        console.log(taste);
        if(taste === 'spicy' || taste ==='sour' || taste === 'sweet'){
            const data = await Menu.find({taste : taste.charAt(0).toUpperCase() + taste.slice(1)});
            res.json(data);
        }
        else{
            res.status(404).json({error : 'not found'});
        }

            
    }
catch(err){
    console.log(err);
    res.status(500).json({error : 'internal server error'});
} 
});

module.exports = route;