const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
    name : {type : String, required : true},
    age : {type : Number},
    work : {type : String, enum :['chef', 'waiter', 'manager']},
    phone : {type : String},
    email : {type : String, required : true, unique : true},
    address : {type : String},
    salary : {type : Number},
    username : {type : String},
    password : {type : String}
    }
);

personSchema.pre('save', async function (ext) {
    const person = this;
    if(!person.isModified('password')) return;
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(person.password, salt);
        person.password = hashedPassword;
    }
    catch(err){
        console.log(err);
    }
})

personSchema.methods.comparePassword =  async function (pwd) {
    try{
        const match = await bcrypt.compare(pwd, this.password);
        if(match) return true;
        return false;
    }
    catch (err){
        throw err;
    }
}

const Person = mongoose.model('Person', personSchema);

module.exports = Person;