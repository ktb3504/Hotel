const mongoose = require('mongoose');
const expresss = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./Models/Person');

passport.use(new LocalStrategy(async function (username, password, done) {
    try{
        const user = await Person.findOne({username : username});
        if(!user) return done(null, false, {message : 'user not found'});
        const match = await user.comparePassword(password);
        if(match) return done(null, user);
        else return done(null, false, {message : 'incorrect password'});
    }
    catch(err){
        return done(err);
    }
}))

module.exports = passport;