import * as firebase from 'firebase/app';

export function navBarController() {
  // BUTTON MENU
  const mainMenu = document.querySelector('.main-menu');

  const buttonMenu = document.querySelector('#main-menu-button');
  buttonMenu.addEventListener('click', () => {
    mainMenu.classList.toggle('active');
  });

  /* Logout */

  const logout = document.querySelector('#Logout');
  logout.addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
      console.log('sign out');
    });
  });
}
