const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const Pets = require("./database/pets");
// const db = require("./database/pets.js");

const app = express();

const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(__dirname + "/../client/dist"));

// connect to mongoose;

mongoose.connect("mongodb://localhost:27017/pet-db,", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
  console.log("Connected to pet-db");

})
.catch((err)=>{
  console.log(err);
});
// just testing get 
app.get('/get',(req,res)=>{
  res.json("hello world")
});



app.post('/add', (req,res)=>{
  const newPets = new Pets({
    name: req.body.name,
    age: req.body.age,
    price: req.body.price,
    picture: req.body.picture,
    description: req.body.description,

  })
  newPets.save().then((result)=>{
    res.json(result)
})
.catch((err)=>{
  res.status(500);
})
})




















app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
  });

