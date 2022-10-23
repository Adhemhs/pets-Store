const express = require("express");
const bcrypt = require("bcrypt");
const JsonWebToken = require("jsonwebtoken");
const SECRET_JWT_CODE = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

const User = require("./database/UserModel");
const router = express.Router();
  

// signin route
router.post('/signin', (req, res) => {
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
});

// login route
router.post('/login', (req, res) => {
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



module.exports = router