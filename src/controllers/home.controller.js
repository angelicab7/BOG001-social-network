import navBar from '../views/navigation-bar.html';
import home from '../views/home.html';
import footer from '../views/footer.html';

export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = `
    ${navBar}
    ${home}
    ${footer}
`;

  return divElement;
};
