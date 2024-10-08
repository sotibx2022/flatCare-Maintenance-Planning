import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from './fireBase';
interface UploadImageResponse {
  error: string | null;
  progress: number;
  downloadUrl: string | null;
}
export const uploadImage = async (
  file: File,
  folderName: string,
  imageUniqueName: string,
): Promise<UploadImageResponse> => {
  const storageRef = ref(storage, `${folderName}/${imageUniqueName}`);
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
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => {
            downloadUrl = url;
            resolve({ error, progress, downloadUrl });
          })
          .catch((err) => {
            error = err.message;
            resolve({ error, progress, downloadUrl });
          });
      },
    );
  });
};
