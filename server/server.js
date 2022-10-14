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


// add new pets: 
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

// get all pets:
app.get("/get",(req,res)=> {
  pets.find({}, (err,results)=>{
    err ? console.log(err) : res.send(results);
  })
})


// delete pet:

app.delete('/delete/:id', (req,res)=>{
  const id = req.params.id;
  Pets.findByIdAndRemove(id).exec()
  Pets.find({},(err,results)=>{
    err? console.log(err) : res.send(results);
  })
});

// update pet 
 app.put("/update", (req,res)=>{
  const id = req.body._id;
  const name = req.body.name;
  const age = req.body.age;
  const price = req.body.price;
  const picture = req.body.picture;
  const description = req.body.description;

  const test = () => {
    if (id === undefined) {
      return { name :name , age : age, price : price, picture : picture, description : description}
    } else {
      return { _id: id }
    }
  }

  Pets.updateOne(test(), {
    $set: {
      name: name,
      age: age,
      price: price,
      picture: picture,
      description: description
  } },

  // upsert to check if pet's id exist to add new data to my db 
     {upsert: true}, (err,results)=>{
        err ? console.log(err) : console.log('updated');
  }
  )
 })



 






















app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
  });

