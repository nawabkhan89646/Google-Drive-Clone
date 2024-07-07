
import firebase from "firebase";

// const firebaseConfig = {
//     apiKey: "AIzaSyAraxtT2NS8FQCzZRPtXAPfLKpGQTX3odQ",
//     authDomain: "drive-live-1c830.firebaseapp.com",
//     projectId: "drive-live-1c830",
//     storageBucket: "drive-live-1c830.appspot.com",
//     messagingSenderId: "634415858554",
//     appId: "1:634415858554:web:d13a225c19cd81c38f8cc3"
// };
const firebaseConfig = {
    apiKey: "AIzaSyC4jMQWN2Q-qVv-idAUIyABUcGoPYP264s",
    authDomain: "driveclone-9ac80.firebaseapp.com",
    projectId: "driveclone-9ac80",
    storageBucket: "driveclone-9ac80.appspot.com",
    messagingSenderId: "778688997260",
    appId: "1:778688997260:web:a07aef202b9db2dbbcd8a9",
    measurementId: "G-D2FENG37SF"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const storage = firebase.storage()
const db = firebaseApp.firestore()

export { auth, provider, db, storage }
