// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4yMwxIVUXfHWyoT68o1QW2kDmF90_DLA",
  authDomain: "quizwizard-5c0d5.firebaseapp.com",
  projectId: "quizwizard-5c0d5",
  storageBucket: "quizwizard-5c0d5.firebasestorage.app",
  messagingSenderId: "592334144213",
  appId: "1:592334144213:web:cc9a9d63571782892bd85c",
  measurementId: "G-DKCMSF06BV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics
export const analytics = getAnalytics(app);

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); 