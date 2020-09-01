/* eslint-disable max-len */
import * as firebase from 'firebase';

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
      likes: [],
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
export function getPosts() {
  const db = firebase.firestore();
  return new Promise((resolve, reject) => {
    db.collection('posts').get().then((querySnapshot) => {
      resolve(querySnapshot);
    }).catch((error) => {
      reject(error);
    });
  });
}

export function deletePosts(postId) {
  const db = firebase.firestore();
  return new Promise((resolve, reject) => {
    db.collection('posts').doc(postId).delete().then(() => {
      resolve();
    })
      .catch((error) => {
        reject(error);
      });
  });
}
// LIKES
export async function likePost(currentUserId, postId, userHasLikedThePost) {
  const db = firebase.firestore();
  const postRef = db.collection('posts').doc(postId);
  if (userHasLikedThePost) {
    await postRef.update({
      likes: firebase.firestore.FieldValue.arrayRemove(currentUserId),
    });
  } else {
    await postRef.update({
      likes: firebase.firestore.FieldValue.arrayUnion(currentUserId),
    });
  }
}
