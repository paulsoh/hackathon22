const config = {
  apiKey: "AIzaSyA_CWNLypqaJlkkMQkG_l7rtUU6Hcq8IQk",
  authDomain: "armygo-16ecc.firebaseapp.com",
  databaseURL: "https://armygo-16ecc.firebaseio.com",
  storageBucket: "armygo-16ecc.appspot.com",
  messagingSenderId: "334507674087"
};

const firebaseApp = window.firebase.initializeApp(config);

const personnel = firebaseApp.database().ref('personnel');
const logData = firebaseApp.database().ref('logData');
const messages = firebaseApp.database().ref('messages');

export { personnel, logData, messages };
