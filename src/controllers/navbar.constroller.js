export function navBarController() {
  // BUTTON MENU
  const mainMenu = document.querySelector('.main-menu');

  const buttonMenu = document.querySelector('#main-menu-button');
  buttonMenu.addEventListener('click', () => {
    mainMenu.classList.toggle('active');
  });
}
