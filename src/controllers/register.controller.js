import * as firebase from 'firebase/app';
import navBar from '../views/navigation-bar.html';
import register from '../views/register.html';
import footer from '../views/footer.html';

async function createUserWithEmailAndPassword() {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    console.error(error);
  }
}

const init = () => window.addEventListener('load', () => {
  // El evento load se ejecuta luego de que toda la pagina carga y está lista

  /* Signup form */
  const signUpForm = document.querySelector('#signup-form');
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault(); // cancelar evento de reinicio del formulario
    createUserWithEmailAndPassword();
  });
});

export default () => {
  const content = document.getElementById('root');

  const divElement = document.createElement('div');
  divElement.innerHTML = `
    ${navBar}
    ${register}
    ${footer}
  
`;
 content.appendChild(divElement);
};
