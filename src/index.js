import React from 'react';
import ReactDOM from 'react-dom';
import './scss/main.scss';
import App from './App';
import firebaseConfig from './firebase/config';
import * as firebase from 'firebase';

firebase.initializeApp(firebaseConfig);
//firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
