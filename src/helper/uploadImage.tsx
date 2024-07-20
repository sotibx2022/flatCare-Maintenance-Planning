import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { firestore, storage } from "./fireBase";
export const uploadImage = async (file: File, folderName: string): Promise<{ error: string | null; progress: number; downloadUrl: string | null }> => {
  const storageRef = ref(storage, `${folderName}/ + file.name`);
  console.log('Firebase Configuration at uploadImage.tsx:', {
    apiKey: process.env.FIREBASE_API_KEY,
    apiSecret: process.env.FIREBASE_API_SECRET,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  });
  // Create a reference to the file to upload
  const uploadTask = uploadBytesResumable(storageRef, file);
  // Variables to track progress, error, and download URL
  let progress = 0;
  let error: string | null = null;
  let downloadUrl: string | null = null;
  return new Promise((resolve) => {
    // Register observers
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Calculate progress percentage
        progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (err) => {
        // Handle unsuccessful uploads
        error = err.message;
        resolve({ error, progress, downloadUrl });
      },
      () => {
        // Handle successful completion
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          downloadUrl = url;
          resolve({ error, progress, downloadUrl });
        }).catch((err) => {
          error = err.message;
          resolve({ error, progress, downloadUrl });
        });
      }
    );
  });
};
