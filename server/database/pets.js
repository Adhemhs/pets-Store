const mongoose = require('mongoose');

const petsSchema = new mongoose.Schema({
   
    name: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true
    },
   
    price: String,
    
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