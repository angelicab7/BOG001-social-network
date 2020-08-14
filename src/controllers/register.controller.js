import * as firebase from 'firebase/app';
import Swal from 'sweetalert2';
import navBar from '../views/navigation-bar.html';
import register from '../views/register.html';
import footer from '../views/footer.html';

async function createUserWithEmailAndPassword() {
  const db = firebase.firestore();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const lastName = document.querySelector('#lastname').value;
  const name = document.querySelector('#name').value;
  Swal.fire({
    title: 'Registering information, please wait...',
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    const userCredentials = await firebase.auth().createUserWithEmailAndPassword(email, password);

    await db.collection('users').doc(userCredentials.user.uid).set({
      lastName,
      name,
    });

    Swal.close();
    window.location.hash = '#/Login';
  } catch (error) {
    console.error(error);
  }
}

export default () => {
  const content = document.getElementById('root');

  const divElement = document.createElement('div');
  divElement.innerHTML = `
    ${navBar}
    ${register}
    ${footer}
  
`;
  content.appendChild(divElement);

  /* Signup form */
  const signUpForm = document.querySelector('#signup-form');
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault(); // cancelar evento de reinicio del formulario
    createUserWithEmailAndPassword();
  });
};
