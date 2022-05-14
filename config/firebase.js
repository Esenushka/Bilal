import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDUro7PD6_MVvM4UrqcKsjk7WEFRd0c0Xo",
    authDomain: "bilal-20d85.firebaseapp.com",
    projectId: "bilal-20d85",
    storageBucket: "bilal-20d85.appspot.com",
    messagingSenderId: "127974565836",
    appId: "1:127974565836:web:8c3be5faeee8bdd961df69",
    measurementId: "G-79JCK8CRPD"
};

try {
    firebase.initializeApp(firebaseConfig);
} catch (err) {
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack)
    }
}
export const db = firebase.firestore();
export const storageRef = firebase.storage();

const fire = firebase;
export default fire;