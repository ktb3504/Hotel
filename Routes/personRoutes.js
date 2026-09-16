const express = require('express');

const Person = require('../Models/Person');

const route = express.Router();

route.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = Person(data);
        const response = await newPerson.save();
        res.status(200).json(response);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
})

route.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
})

route.get('/:workType', async (req, res) => {
        try{
        const workType = req.params.workType;
        console.log(workType);
        if(workType == 'chef' || workType =='waiter' || workType == 'manager'){
            const data = await Person.find({work: workType});
            res.json(data);
        }
        
    }
catch(err){
    console.log(err);
    res.status(500).json({error : 'internal server error'});
} 
});


  

module.exports = route;