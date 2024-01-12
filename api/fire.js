/* DATABASE */

const { initializeApp } = require('firebase/app');
const { getDatabase } = require('firebase/database');

const firebaseConfig = {
    apiKey: "AIzaSyCexcAfBIBk6KCYU8n-SokQu_n0HG9tZeI",
    authDomain: "openclass24-firebase-a0ff7.firebaseapp.com",
    projectId: "openclass24-firebase-a0ff7",
    storageBucket: "openclass24-firebase-a0ff7.appspot.com",
    messagingSenderId: "112231467786",
    appId: "1:112231467786:web:82452cd850db04dca2c8f3",
    measurementId: "G-BWNN9JS0GF",
    databaseURL: 'https://openclass24-firebase-a0ff7-default-rtdb.asia-southeast1.firebasedatabase.app'
};
  
const firebaseApp = initializeApp(firebaseConfig);
const firebaseDB = getDatabase(firebaseApp);

module.exports = { firebaseApp, firebaseDB };