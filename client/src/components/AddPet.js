import React, { useState } from 'react';
import axios from 'axios'
import './addPet.css';


function AddPet() {
    const [name, setName] = useState('');
    const [age, setAge] = useState();
    const [price, setPrice] = useState();
    const [picture, setPicture] = useState('');
    const [description, setDescription] = useState('');

    const onNameChange = (event) => {
        let text = event.target.value;
        setName(text);
    }
    const onAgeChange = function (event) {
        let number = event.target.value
        setAge(number)
    }
    const onPriceChange = function (event) {
        let number = event.target.value
        setPrice(number)
    }
    const onPicChange = function (event) {
        let image = event.target.value
        setPicture(image)
    }
    const onDescriptionsChange = function (event) {
        let description = event.target.value
        setDescription(description)
    }

    const savePets = function (event) {
        event.preventDefault()
        axios.post('http://localhost:3001/pet/add', {
            name: name,
            age: age,
            price: price,
            picture: picture,
            description: description
        })

            .then(response => console.log(response))
            .catch(err => console.log(err))
        alert('Pet added')

    }
    return (

        <form className="add-pet">
            <label > pet's name:</label><br />
            <input type="text" placeholder="enter your pets name" onChange={onNameChange} /><br/>
            <label >pet's age</label><br/>
            <input type="number" placeholder='how old is ur pet ' onChange={onAgeChange} /><br />
            <label>Price</label><br />
            <input type="number" placeholder='suggested price' onChange={onPriceChange} /><br></br>
            <label >Image</label><br />
            <input type="img" placeholder="load your pets image" onChange={onPicChange} /><br></br>
            <label >description</label><br />
            <input type="text" placeholder="describe ur pet" onChange={onDescriptionsChange} /><br></br>
            <button className='button' onClick={savePets}> Add </button>

        </form>

    )

}

export default AddPet;