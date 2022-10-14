import React, { useState } from "react";
import axios from "axios";

const Home = (props) => {
    // update pet,

    const [age, setAge] = useState(0)
    const [picture, setPicture] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [showUpdate, setShowUpdate] = useState(false);


    const updatePet = (_id) => {
        axios.put("http://localhost:3000/update", {
            _id: _id,
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
                <div>
                    <input className="up" type="text" placeholder="your pet's age" defaultValue={e.age} onChange={(e) => {
                        setAge(e.target.value)
                    }}></input>
                    <input className="up" type="text" placeholder="pet's price " defaultValue={e.price} onChange={(e) => {
                        setPrice(e.target.value)
                    }}></input>
                    <input className="up" type="text" placeholder="pet's picture" defaultValue={e.picture} onChange={(e) => {
                        setPicture(e.target.value)
                    }}></input>
                    <button className="button" onClick={() => {
                        setShowUpdate(false);
                        return updatePet(e._id);
                    }}>update</button>
                </div>
            )
        } else {
            return <div className="btn- MainPage">
                <button className="button" onClick={() => setShowUpdate(true)}>update pet</button>
            </div>
        }
    };
    // delete pet

    const deletePet = (id) => {
        axios.delete(`http://localhost:3000/delete/${id}`).then((response) => {
            console.log("pet deleted successfully ");
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
                            <img src={e.picture} title={e.name} alt={e.name} className="pet-img" />
                            <h1>{e.title}</h1>
                            <h1>{e.age}</h1>
                            <h1>{e.price} TND</h1>
                            <h1>{e.description}</h1>
                           
                            
                            {showYourUpdate(e)}
                             <button className="button" onClick={() => {
                                return deletePet(e._id);
                             }}>Delete</button>

                        </div>
                    </div>
                )
            })}

        </div>
    )





};

export default Home;














