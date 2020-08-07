import loginView from '../views/login.html';
import navBar from '../views/navigation-bar.html';

export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = `
    ${navBar}
    ${loginView}
  `;
  return divElement;
};
