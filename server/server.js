const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./userRoutes");
const petRoutes = require("./PetsRoutes");

const app = express();

const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/dist"));

mongoose
  .connect("mongodb://localhost:27017/petstore", { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
  .then(() => console.log("Connected to DB"))
  .catch((err) => {
    console.log(err)});


// here we want express to use userRoutes for all requests coming at /auth like /auth/login

app.use("/auth", userRoutes);

app.use("/pet", petRoutes);

app.listen(port, () =>
console.log(`app listening at http://localhost:${port}`)
);