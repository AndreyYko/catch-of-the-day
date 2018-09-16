import Rebase from 're-base'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDJfCs5W_PiQeh_B9a5FkW3hU9egWVY02E",
  authDomain: "catch-of-the-day-flack.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-flack.firebaseio.com",
  projectId: "catch-of-the-day-flack",
  storageBucket: "catch-of-the-day-flack.appspot.com",
  messagingSenderId: "668975485525"
})

const base = Rebase.createClass(firebaseApp.database())

// This is a named export
export { firebaseApp }

// This is a default export
export default base