import * as firebase from 'firebase/app';
import Swal from 'sweetalert2';
import loginView from '../views/login.html';
import navBar from '../views/navigation-bar.html';
import footer from '../views/footer.html';

async function signInWithEmailAndPassword() {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  Swal.fire({
    title: 'Login In, please wait...',
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    Swal.close();
    window.location.hash = '#/Posts';
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.message,
    });
  }
}

async function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const db = firebase.firestore();

  Swal.fire({
    title: 'Login In, please wait...',
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    const result = await firebase.auth().signInWithPopup(provider);
    const uid = result.user.uid;
    const usersDoc = await db.collection('users').doc(uid).get();
    if (!usersDoc.exists) {
      await db.collection('users').doc(uid).set({
        lastName: result.additionalUserInfo.profile.family_name,
        name: result.additionalUserInfo.profile.given_name,
        picture: result.additionalUserInfo.profile.picture,
      });
    }
    Swal.close();
    window.location.hash = '#/Posts';
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.message,
    });
  }
}

export default () => {
  const content = document.getElementById('root');

  const divElement = document.createElement('div');
  divElement.innerHTML = `
    ${navBar}
    ${loginView}
    ${footer}
  `;

  content.appendChild(divElement);

  /* Login form */
  const loginForm = document.querySelector('#login-form');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // cancelar evento de reinicio del formulario
    signInWithEmailAndPassword();
  });

  const googleButton = document.querySelector('#google-button');
  googleButton.addEventListener('click', () => {
    signInWithGoogle();
  });
};
