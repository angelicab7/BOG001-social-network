import navBar from '../views/navigation-bar.html';
import adoptMe from '../views/adoptme.html';
import footer from '../views/footer.html';

export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = `
    ${navBar}
    ${adoptMe}
    ${footer}
  
`;
  return divElement;
};