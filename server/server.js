const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const JsonWebToken = require("jsonwebtoken");
const SECRET_JWT_CODE = "AdhemIsSuffering";


const mongoose = require("mongoose");
const Pets = require("./database/pets");
const User = require("./database/user");
const { response } = require("express");
// const db = require("./database/pets.js");

const app = express();

const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/dist"));

// connect to mongoose;

mongoose.connect("mongodb://localhost:27017/pet-db,", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to pet-db");

  })
  .catch((err) => {
    console.log(err);
  });
// just testing get 
   


/*app.get('/get', (req, res) => {
     res.json("hello world")
 } );  
 */


// add new pets: 

app.post('/add', (req, res) => {
  const newPets = new Pets({
    name: req.body.name,
    age: req.body.age,
    price: req.body.price,
    picture: req.body.picture,
    description: req.body.description,

  })
  newPets.save().then((result) => {
    res.json(result)
  })
    .catch((err) => {
      res.status(500);
    })
})

// get all pets:
app.get("/get", (req, res) => {
  Pets.find({}, (err, results) => {
    err ? console.log(err) : res.send(results);
  })
})


// delete pet:

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  Pets.findByIdAndRemove(id).exec()
  Pets.find({}, (err, results) => {
    err ? console.log(err) : res.send(results);
  })
});

// update pet 
app.put('/update/:id',(req,res)=> {
  console.log(req.params.id)
  const { name, age, price, picture, description} = req.body;
  const petsData = Pets.findOneAndUpdate(req.params.id, {
    name,
    age,
    price,
    picture,
    description
  })
  .then((data)=> res.status(200).json(data))
  .catch((err)=> console.log(err))


 })
 



app.post('/user/signup', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.json({ succes: false, error: "send needed params" })
    return
  }
 const newUser = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 5),
  })
   newUser.save().then((user) => {
    const token = JsonWebToken.sign({ id: user._id, username: user.username }, SECRET_JWT_CODE)
    res.json({ succes: true, token: token })
  }).catch((err) => {
    res.json({ succes: false, error: err })
  });
} );

app.post('/user/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.json({ succes: false, error: "send needed params" })
    return
  }
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        res.json({ succes: false, error: "user not found" })
      }
      else {
        if (!bcrypt.compareSync(req.body.password, user.password)) {
          res.json({ succes: false, error: "wrong password" })
        }
        else {
          const token = JsonWebToken.sign({ id: user._id, username: user.username }, SECRET_JWT_CODE)
          res.json({ succes: true, token: token })
        }
      }
    })
    .catch((err) => {
      res.json({ succes: false, error: err })
    })
})


app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

