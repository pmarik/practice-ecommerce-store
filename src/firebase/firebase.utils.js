import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyALTseLSvERmiUJpN_6vdpYjrRT8iTv8mk",
    authDomain: "practice-ecommerce-db.firebaseapp.com",
    databaseURL: "https://practice-ecommerce-db.firebaseio.com",
    projectId: "practice-ecommerce-db",
    storageBucket: "practice-ecommerce-db.appspot.com",
    messagingSenderId: "635330029172",
    appId: "1:635330029172:web:72aeec28be09d0a7eb5321",
    measurementId: "G-868KHBLF65"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
         const { displayName, email } = userAuth;
         const createdAt = new Date();

         try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
         } catch(error){
            console.log('error creating user', error.message);
         }
    }

    console.log(userRef);
    return userRef;
}

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;