import React, { useEffect, useState } from 'react';
import ViewPatients from './components/ViewPatients';
import AppLogin from './components/AppLogin';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as firebase from 'firebase';
import { auth } from "firebase";
require('dotenv').config()

function App() {
  const [loggedIn, setLoggedIn] = useState('loading');
  const issigned = () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        //console.log(user)
        setLoggedIn('signed')
      } else {
        // console.log('not signed')
        setLoggedIn('notSigned')
      }
    });
  }

  useEffect(() => {
    issigned()
  });

  return (
    <div className="App">
      {loggedIn === 'loading' && <div className='app-login'><CircularProgress color="primary" size={100} thickness={5} /></div>}
      {loggedIn === 'notSigned' && <AppLogin />}
      {loggedIn === 'signed' && <ViewPatients />}
    </div>
  );
}

export default App;
