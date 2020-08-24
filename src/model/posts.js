/* eslint-disable max-len */
import * as firebase from 'firebase/app';

/**
 * Insert a post into the database
 * @param {string} message
 * @param {string} imageURL
 */
export async function insertPostIntoDatabase(message, imageURL) {
  const db = firebase.firestore();
  const { uid } = firebase.auth().currentUser;
  const usersDoc = await db.collection('users').doc(uid).get();
  const userData = usersDoc.data();
  return new Promise((resolve, reject) => {
    db.collection('posts').doc().set({
      uid,
      userName: `${userData.name} ${userData.lastName}`,
      userPicture: userData.picture,
      message,
      imageURL,
    }).then(() => {
      resolve();
    })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * @returns {Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>>} - Returns the list with all the posts in the database
 */
export async function getPosts() {
  const db = firebase.firestore();
  return new Promise((resolve, reject) => {
    db.collection('posts').get().then((querySnapshot) => {
      resolve(querySnapshot);
    }).catch((error) => {
      reject(error);
    });
  });
}
