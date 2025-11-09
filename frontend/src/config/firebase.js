import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbYApL1UTDCuRvReAUmV_rfqDVacS20VM",
  authDomain: "travelbook-c5c57.firebaseapp.com",
  projectId: "project-667959703011",
  storageBucket: "travelbook-c5c57.firebasestorage.app",
  messagingSenderId: "667959703011",
  appId: "1:667959703011:web:c2233289f3ef23a9641cd6",
  measurementId: "G-E4WSG44FMJ"
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
