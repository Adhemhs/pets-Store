import React, { useEffect, useState } from 'react'
import './App.css';
import AddPet from './components/AddPet.js';
import axios from 'axios';
import Home from './components/MainPage.js';





function App() {

  const [showMain, setShowMain] = useState(true);
  const [showAddPets, setShowAddPets] = useState(false);
  const [data, setData] = useState([]);

  const onHomeClick = () => {
    setShowMain(true);
    setShowAddPets(false);
  }
  const onAddpetClick = () => {
    setShowMain(false);
    setShowAddPets(true);
  }




  useEffect(() => {
    axios.get('http://localhost:3000/get').then(response=>{
      setData(response.data)
    })
  })


 return (
    <div>

  
<div className="header">

<nav className="navbar">
  {/* home page button */}
  <i className="fa-solid fa-person-walking-luggage" id='logo'></i>
  <div className="navBarLink" onClick={onHomeClick}><i className="fa fa-home fa-fw" aria-hidden="true"></i>&nbsp; Home</div>
  {/* add trips page button */}
  <div className="navBarLink" onClick={onAddpetClick}><i className="fa fa-pencil fa-fw" aria-hidden="true"></i>&nbsp;Add pets</div>
</nav>

</div>
{/* main page*/}
{showMain && <Home data={data} setData={setData} />}
{/* add pets page */}
{showAddPets && <AddPet />}

</div>
  )
}

export default App;