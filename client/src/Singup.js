import React, { useState } from 'react';

import Axios from 'axios';
import Login from './Login';

function SingUp() {
  
  const [usernames, setUserName] =useState('');
  const [passwords, setPassword] = useState('');
 // 
  const [log, setLog]= useState(false);
 
  const newUser ={
   username:usernames,
    password:passwords
  }
   
  const hopIn = () => {
    Axios.post('http://localhost:3000/user/signup', newUser).then(response=>{
      console.log(response)
    })
    .catch( err => {console.log(err) });
  };

  // enter the log in page 

  const loging = ()=> {
    if(log === false){
      return (
        <div className="log-in">
          <h1>Sing In</h1>
          <input type="text" placeholder="username" name="username" onChange={
            (e) => {
              setUserName(e.target.value)
            }
          } ></input><br/>
          <input type="password" placeholder="password" onChange={
            (e) => {
              setPassword(e.target.value);
            }}></input><br/>
            <button className='button' onClick={() => { return hopIn()}} >SIGN IN</button><br/><br/><br/>
            <h2> if you already have an account you can log in</h2>
            <button className='button' onClick={() => { setLog(true)}}> LOG IN</button><br/><br/><br/>
        </div>
      )
    } else {
      return <Login/>
    }
  }

  return (
    <div>
      {loging()}
    </div>
  )

}

export default SingUp;