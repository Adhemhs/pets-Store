import React, { useState } from "react";
import axios from "axios";
import './mainPage.css';

const Home = (props) => {
    // update pet,
    const [name, setPetName] = useState("");
    const [age, setAge] = useState(0)
    const [picture, setPicture] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [showUpdate, setShowUpdate] = useState(false);


    const updatePet = (id) => {
        axios.put(`http://localhost:3000/update/${id}`, {
            name:name,
            id: id,
            age: age,
            price: price,
            picture: picture,
            description: description

        }).then((response) => {
            console.log("Pet updated successfully ");

        });
    }

    //Show update 
    const showYourUpdate = (e) => {
        if (showUpdate) {
            return (
                <center>
                    <div>
                    <input className="up" type="text" placeholder="wanna change the pet name?" defaultValue={e.name} onChange={(e) => {
                            setPetName(e.target.value)
                        }}></input>
                        <input className="up" type="text" placeholder="your pet's age" defaultValue={e.age} onChange={(e) => {
                            setAge(e.target.value)
                        }}></input>
                        <input className="up" type="text" placeholder="pet's price " defaultValue={e.price} onChange={(e) => {
                            setPrice(e.target.value)
                        }}></input>
                        <input className="up" type="text" placeholder="upload the pic link here" defaultValue={e.picture} onChange={(e) => {
                            setPicture(e.target.value)
                        }}></input>
                         <input className="up" type="text" placeholder="tell us more about it" defaultValue={e.description} onChange={(e) => {
                            setDescription(e.target.value)
                        }}></input>
                        <button className="button" onClick={() => {
                            setShowUpdate(false);
                            return updatePet(e._id);
                        }}>update</button>
                    </div>
                </center>

            )
        } else {
            return <div className="btn">
                <button className="button" onClick={() => setShowUpdate(true)}>update pet</button>
            </div>
        }
    };
    // delete pet

    const deletePet = (id) => {
        axios.delete(`http://localhost:3000/delete/${id}`).then((response) => {
            console.log("pet deleted successfully ")
        });
    };


    return (
        <div className="main">
            <div className="main-page">
                <h1 className="h1-title">welcome to<sapn>&nbsp; PETS-SHOP</sapn></h1>
            </div>
            {props.data.map((e, i) => {
                return (
                    <div key={i} className="pets-container">
                        <div className="pet-container">
                            <h1>{e.name}</h1>
                            <img src={e.picture} title={e.name} alt={e.name} className="pet-img" />
                            <h1>{e.age}</h1>
                            <h1>{e.price} TND</h1>
                            <h1>{e.description}</h1>


                            {showYourUpdate(e)}
                            <button className="button" onClick={() => {
                                return deletePet(e._id)
                            }}>Delete</button>

                        </div>
                    </div>
                )
            })}

        </div>
    )





};

export default Home;














