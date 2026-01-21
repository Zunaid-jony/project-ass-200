
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDiL1A9dNl3Biu6egS-B2Z9P00_oyad2BQ",
  authDomain: "test-project-1775f.firebaseapp.com",
  projectId: "test-project-1775f",
  storageBucket: "test-project-1775f.firebasestorage.app",
  messagingSenderId: "781269248158",
  appId: "1:781269248158:web:62ad6b49cb5d11c5de338f",
  measurementId: "G-K0LDR08SFP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Optional: Analytics (only works in browser)
export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;

