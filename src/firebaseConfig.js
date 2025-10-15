import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
// import { connectAuthEmulator } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
// import { connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions  } from "firebase/functions";
// import { connectFunctionsEmulator } from "firebase/functions";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA4IzIWwsDgVWCNZdEBJmmoxDMz84AQIkM",
  authDomain: "novelnest-f4af5.firebaseapp.com",
  projectId: "novelnest-f4af5",
  storageBucket: "novelnest-f4af5.firebasestorage.app",
  messagingSenderId: "746753912486",
  appId: "1:746753912486:web:86f3035cc80cd7ab854e67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get instances
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
// IMPORTANT: Initialize functions for your specific region if it's not 'us-central1'
const functions = getFunctions(app, 'us-central1'); 


export { auth, db, storage, functions };


// const app = initializeApp(firebaseConfig);
// // export const auth = getAuth(app);
// // export const db = getFirestore(app);
// const db = initializeFirestore(app, {
//   experimentalForceLongPolling: true,
//   useFetchStreams: false, 
// });

// export const auth = getAuth(app);
// export {db};
// export const functions = getFunctions(app);
// export const storage = getStorage(app);

// const AUTH_PORT = 9099;
// const FIRESTORE_PORT = 8080;
// const FUNCTIONS_PORT = 5001;

// if (__DEV__) {
//   const EMULATOR_HOST = "10.249.1.151";
//   console.log(`DEV MODE: Connecting to local Firebase emulators at host: ${EMULATOR_HOST}`);
  
//   // connectAuthEmulator(auth, `http://${EMULATOR_HOST}:${AUTH_PORT}`);
//   // connectFirestoreEmulator(db, EMULATOR_HOST, FIRESTORE_PORT);
//   // connectFunctionsEmulator(functions, EMULATOR_HOST, FUNCTIONS_PORT);

//   connectAuthEmulator(auth, `http://${EMULATOR_HOST}:9099`);
//   connectFirestoreEmulator(db, EMULATOR_HOST, 8080);
//   connectFunctionsEmulator(functions, EMULATOR_HOST, 5001);
// }