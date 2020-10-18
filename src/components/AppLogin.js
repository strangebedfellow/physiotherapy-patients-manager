import React, { useEffect, useReducer, useState } from 'react';
import * as firebase from 'firebase';
import { auth } from "firebase";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function AppLogin() {
  const initialState = {
    email: '',
    password: ''
  }

  const [userInput, setUserInput] = useReducer((state, newState) => ({ ...state, ...newState }), initialState);

  const handleChange = e => {
    setUserInput({ [e.target.name]: e.target.value });
  }

  const signIn = () => {
    firebase.auth().signInWithEmailAndPassword(userInput.email, userInput.password)
      .then(function (firebaseUser) {
        console.log(firebaseUser)
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode)
      });
  }

  return (
    <div className='app-login'>
      <form noValidate autoComplete="off">
        <TextField name="email" onChange={handleChange} id="standard-basic" label="użytkownik" />
        <TextField name="password" onChange={handleChange} id="standard-basic" label="hasło" type="password" />
        <Button onClick={signIn} variant="contained" color="primary">Zaloguj</Button>
      </form>
    </div>
  );
}

export default AppLogin;
