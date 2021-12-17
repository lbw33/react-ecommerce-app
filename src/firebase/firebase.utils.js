import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

require("dotenv").config();
console.log(process.env.FB_API_KEY);

// const configuration = {
//   apiKey: `${process.env.FB_API_KEY}`,
//   authDomain: `${process.env.FB_AUTH_DOMAIN}`,
//   projectId: `${process.env.FB_PROJECT_ID}`,
//   storageBucket: `${process.env.FB_STORAGE_BUCKET}`,
//   messagingSenderId: `${process.env.FB_MESSAGING_SENDER_ID}`,
//   appId: `${process.env.FB_APP_ID}`,
//   measurementId: `${process.env.FB_MEASUREMENT_ID}`,
// };

const configuration = {
  apiKey: "AIzaSyAjr836YIn7f5PhthuMt3CGhUfdfxuJ6kI",
  authDomain: "clothing-app-30ecb.firebaseapp.com",
  projectId: "clothing-app-30ecb",
  storageBucket: "clothing-app-30ecb.appspot.com",
  messagingSenderId: "855145858923",
  appId: "1:855145858923:web:62056cdc77236ecb23ae2e",
  measurementId: "G-1NTJ0WKKMJ",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

if (!firebase.apps.length) {
  firebase.initializeApp(configuration);
} else {
  firebase.app();
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
