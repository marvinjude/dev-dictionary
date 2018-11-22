import firebase from 'firebase-admin'

var config = {
    apiKey: "AIzaSyClNbYsLuGiJS_92eE8qD6gX76AsLDZzrw",
    authDomain: "dev-dictionary.firebaseapp.com",
    databaseURL: "https://dev-dictionary.firebaseio.com",
    projectId: "dev-dictionary",
    storageBucket: "dev-dictionary.appspot.com",
    messagingSenderId: "251835988491"
};

export default firebase.initializeApp(config);