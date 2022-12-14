const mongoose = require('mongoose');

const petsSchema = new mongoose.Schema({
   
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
   
    price: Number,
    
    picture: {
      type: String,
      default: "will be uploaded soon"
    },
    description: {
        type:String,
        default: "lovely pet"
    },
    
       

});

const Pets = mongoose.model('Pets', petsSchema);

module.exports = Pets;