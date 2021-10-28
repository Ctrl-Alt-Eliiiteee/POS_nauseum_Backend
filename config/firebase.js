const firebase = require('firebase/app');

const firebaseConfig = require('../secret/firebaseConfig');

firebase.initializeApp(firebaseConfig);


module.exports = firebase;



