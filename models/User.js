const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;
const UserSchema = new Schema({
username:{
    type:String,
    required: true, 
    required: [true, 'Please provide a Username']
},
password:{
    type: String,
    required: [true, 'Please provide a Password']
},
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save' , function(next){
    const user = this 
    bcrypt.hash(user.password , 10 , (error, hash) =>{
        user.password = hash
        next()
    })
})
const User = mongoose.model('User', UserSchema);
module.exports = User