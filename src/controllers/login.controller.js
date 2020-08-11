import * as firebase from 'firebase/app';

import loginView from '../views/login.html';
import navBar from '../views/navigation-bar.html';
import footer from '../views/footer.html';

export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = `
    ${navBar}
    ${loginView}
    ${footer}
  `;
  return divElement;
};
