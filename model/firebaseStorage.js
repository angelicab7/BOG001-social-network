import * as firebase from 'firebase/app';

/**
 *
 * @param {File} image - Image to upload
 * @returns {Promise<string>} - Returns the downloadURL of the uploaded image
 */
export async function uploadPostImage(image) {
  const metadata = {
    contentType: image.type,
  };

  const date = new Date();
  const imageId = date.getTime();

  const { uid } = firebase.auth().currentUser;
  const storage = firebase.storage();
  const storageRef = storage.ref();
  // Upload file and metadata to the object 'images/mountains.jpg'
  const uploadTask = storageRef.child(`user/${uid}/${imageId}_${image.name}`).put(image, metadata);

  return new Promise((resolve, reject) => {
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      (snapshot) => {
        // Get task progress, including the number of bytes
        // uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
          default:
            break;
        }
      }, (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        console.error(error);
        reject(error);
      }, async () => {
        // Upload completed successfully, now we can get the download URL
        const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
        console.log('File available at', downloadURL);
        resolve(downloadURL);
      });
  });
}
