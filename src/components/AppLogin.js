import React, { useEffect, useReducer, useState } from 'react';
import * as firebase from 'firebase';
import { auth } from "firebase";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

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
        //var errorMessage = error.message;
        if (errorCode === 'auth/invalid-email') {
          alert('Błędny adres e-mail')
        }
        if (errorCode === 'auth/user-not-found') {
          alert('Nie znaleziono użytkownika')
        }
        if (errorCode === 'auth/wrong-password') {
          alert('Błędne hasło')
        }
      });
  }

  return (
    <div className='app-login'>
      <Paper elevation={4} variant="outlined">
        <Box px={5} width={250}>
          <form noValidate autoComplete="off">
            <TextField name="email" onChange={handleChange} id="standard-basic" label="użytkownik" fullWidth/>
            <TextField name="password" onChange={handleChange} id="standard-basic" label="hasło" type="password" />
            <Button onClick={signIn} variant="contained" color="primary">Zaloguj</Button>
          </form>
        </Box>
      </Paper >
    </div>
  );
}

export default AppLogin;
