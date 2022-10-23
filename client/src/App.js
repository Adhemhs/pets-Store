import React, { useEffect, useState } from 'react'
import './App.css';
import AddPet from './components/AddPet.js';
import axios from 'axios';
import Home from './components/MainPage.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { button } from 'react-bootstrap'





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
    axios.get('http://localhost:3001/pet/all').then(response => {
      setData(response.data)
    })
  })


  return (
    <center>
      <div>


        <div className="header">

          <nav className="navbar">
            {/* home page button */}
            <i className="italic"></i>
            <div className="navBarLink" onClick={onHomeClick}> <button className='button'>Home</button></div>
            {/* add pets page button */}
            <div className="navBarLink" onClick={onAddpetClick}><button className='button'>Add your pet </button></div>
          </nav>

        </div>

        {showMain && <Home data={data} setData={setData} />}

        {showAddPets && <AddPet />}
    
      </div>
    </center>


  )
}

export default App;