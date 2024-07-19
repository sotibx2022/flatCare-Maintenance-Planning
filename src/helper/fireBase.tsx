// firebase.ts
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  api_key: "559495284621771",
  api_secret: "uploadImage_to_project",
  apiKey: "AIzaSyDgkjll6GoQWYP3pjAzfmBsNBW7bdOA4fg",
  authDomain: "flat-care-maintenance-planning.firebaseapp.com",
  projectId: "flat-care-maintenance-planning",
  storageBucket: "flat-care-maintenance-planning.appspot.com",
  messagingSenderId: "859477421846",
  appId: "1:859477421846:web:775e5c8c080b87871d2a37",
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const firestore = getFirestore(app);
export { storage, firestore };
