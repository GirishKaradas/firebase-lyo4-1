import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/database'


export const config = {
   apiKey: "AIzaSyDI3ptricL3aRITUGTa8GeKqHxew8kU3T0",
  authDomain: "lyodata.firebaseapp.com",
  databaseURL: "https://lyodata-default-rtdb.firebaseio.com",
  projectId: "lyodata",
  storageBucket: "lyodata.appspot.com",
  messagingSenderId: "953537304712",
  appId: "1:953537304712:web:5573059cca9a6896d4273d",
  measurementId: "G-3QHHE1Y44B"
}

const app = firebase.initializeApp(config)
export const auth = app.auth()
export const storage = app.storage();//storage
export const storageRef = storage.ref()
export const db = app.firestore();
export const database = app.database()
export default app