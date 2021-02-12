import firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';

import firebaseConfig from './firebaseConfi';

const firebaseApp = firebase.initializeApp(firebase);
const db = firebaseApp.firestore();


export default {
    fbPopup: async () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        
    }
};