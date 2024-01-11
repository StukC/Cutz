
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';
// import 'firebase/storage';

// const firebaseConfig = {
//   apiKey: "AIzaSyD5WPd3mHxyN2mwq9blsgimW3Gc6Hlmiak",
//   authDomain: "solemate-94d90.firebaseapp.com",
//   projectId: "solemate-94d90",
//   storageBucket: "solemate-94d90.appspot.com",
//   messagingSenderId: "682224677218",
//   appId: "1:682224677218:web:5edbd9f52976e8ecd43c3b",
//   measurementId: "G-MYDQPRBC7M"
// }

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = app.auth();
const storage = app.storage();

const firestore = app.firestore();

export { auth, firestore, storage, app };
