import * as firebase from 'firebase/app';
import loginView from '../views/login.html';
import navBar from '../views/navigation-bar.html';
import footer from '../views/footer.html';

async function signInWithEmailAndPassword() {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    console.error(error);
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
};
