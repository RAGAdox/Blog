import firebase from "firebase"
import "firebase/auth"
import "firebase/firestore"
const config = {
  apiKey: process.env.GATSBY_apiKey,
  authDomain: process.env.GATSBY_authDomain,
  databaseURL: process.env.GATSBY_databaseURL,
  projectId: process.env.GATSBY_projectId,
  storageBucket: process.env.GATSBY_storageBucket,
  messagingSenderId: process.env.GATSBY_messagingSenderId,
  appId: process.env.GATSBY_appId,
  measurementId: process.env.GATSBY_measurementId,
}

export const myFirebase =
  typeof window !== "undefined" ? firebase.initializeApp(config) : null
export const firebaseAuthProvider =
  typeof window !== "undefined" ? firebase.auth : null
export const db = typeof window !== "undefined" ? myFirebase.firestore() : null
export const fireAuth = typeof window !== "undefined" ? myFirebase.auth() : null
