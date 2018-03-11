import firebase from 'firebase';

// Initialize Firebase
var config = {
	apiKey: 'AIzaSyDEPFRrQ6_bMBG0cXI_Fjg95_wCLtqcbqg',
	authDomain: 'notey-ed43c.firebaseapp.com',
	databaseURL: 'https://notey-ed43c.firebaseio.com',
	projectId: 'notey-ed43c',
	storageBucket: '',
	messagingSenderId: '543010243987'
};


var fire = firebase.initializeApp(config);
const auth = firebase.auth();

export {
    fire,
    auth
};
