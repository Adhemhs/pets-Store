import React, { useState } from 'react';
import axios from 'axios';
import SingUp from './Singup';
import App from './App';



function LogIn(props) {
    const [usernames, setUsername] = useState("");
    const [passwords, setPassword] = useState("");
    const [errors, setError] = useState(false);

    const [sign, setSing] = useState(false)
    const newUser = {
        username: usernames,
        password: passwords,

    }
    const login = () => {
        axios.post('http://localhost:3000/user/login', newUser).then(response => {
            setError(response.data.success)
            console.log(response.data.success)
        })
            .catch(err => { console.log(err) });
    }
    const gohome = () => {
        if (errors === true) {
            return <div><App data={props.data} /></div>
        } else {
            return (<div>
                <div className="log-in" >
                    <h1>LOG IN</h1>
                    <input type="text" placeholder='username' onChange={
                        (e) => {
                            setUsername(e.target.value);
                        }} ></input><br />
                    <input type="password" placeholder='password' onChange={
                        (e) => {
                            setPassword(e.target.value);
                        }}></input><br />

                    <button className='button' onClick={() => { return login() }}>Log in</button><br /><br /><br />
                    <h3>if you don't have account you can signup first</h3>
                    <button className='button' onClick={() => { setSing(true) }}>signUp</button><br /><br /><br />
                </div>
            </div>)
        }
    }

    // user can sign up  if he don't have account 
    const signup = () => {
        if (sign === true) {
            return <SingUp />
        }
        else {
            return gohome()
        }
    }
    return (
        <div>


            {signup()}

        </div>
    )

}


export default LogIn;