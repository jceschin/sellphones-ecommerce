import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import { Provider } from 'react-redux'
import "rsuite/dist/styles/rsuite-default.css";

import App from './App';
import { st } from './store/index'
import dotenv from "dotenv";
import axios from 'axios';
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || "";

firebase.initializeApp({
  apiKey: "AIzaSyCKqMcOZlxoDAQe1IxBq3x98oWW53DlZ0c",
  authDomain: "e-commerce-f61c7.firebaseapp.com",
  projectId: "e-commerce-f61c7",
  storageBucket: "e-commerce-f61c7.appspot.com",
  messagingSenderId: "898178569880",
  appId: "1:898178569880:web:bbeca0e93b531316d8a2ed",
  measurementId: "G-DP8SFBNX64"
});

/* service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
} */
  
ReactDOM.render(
  <React.StrictMode>
      <Provider store={st}>
        <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
