const express = require("express");
const router = express.Router();
const Pets = require("./database/pets");

// add pet 
router.post('/add',(req, res) => {
  const newPets = new Pets ({
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
  } )
  // get all pets:

  router.get('/all',(req, res) => {
    Pets.find({}, (err, results) => {
      err ? console.log(err) : res.send(results);
    })
  } )

  router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    Pets.findByIdAndRemove(id).exec()
    Pets.find({}, (err, results) => {
      err ? console.log(err) : res.send(results);
    })
  });

  // update your pet
  router.put('/update/:id', (req, res) => {
    console.log(req.params.id)
    const { name, age, price, picture, description } = req.body;
     Pets.findOneAndUpdate(req.params.id, {
      name,
      age,
      price,
      picture,
      description
    })
      .then((data) => res.status(200).json(data))
      .catch((err) => console.log(err))
  
  
  })

  module.exports = router;