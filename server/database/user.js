const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    Email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
   
    password:{
        type: String,
        required: true,
        
    }

});

const User = mongoose.model('User', userSchema);

module.exports = User;