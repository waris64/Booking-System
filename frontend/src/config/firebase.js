import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY ,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "travelbook-c5c57.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "project-667959703011",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "travelbook-c5c57.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "667959703011",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:667959703011:web:c2233289f3ef23a9641cd6",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-E4WSG44FMJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Configure Google Provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;
