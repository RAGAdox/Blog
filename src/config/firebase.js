import firebase from "firebase/app"
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
let instance = null
export const myFirebase =
  typeof window !== "undefined" ? firebase.initializeApp(config) : null
const baseDb = myFirebase.firestore()
export const db = baseDb
export const fireAuth = myFirebase.auth()
