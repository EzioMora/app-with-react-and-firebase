import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyAa21kvqb5Y9lZg-dmv2amWRtXQpLkiwX4",
    authDomain: "app-with-react-and-firebase.firebaseapp.com",
    projectId: "app-with-react-and-firebase",
    storageBucket: "app-with-react-and-firebase.appspot.com",
    messagingSenderId: "447992321700",
    appId: "1:447992321700:web:9fd813030fe14432857831"
};
  
  // Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();
