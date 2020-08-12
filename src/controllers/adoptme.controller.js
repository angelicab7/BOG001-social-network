import navBar from '../views/navigation-bar.html';
import adoptMe from '../views/adoptme.html';
import footer from '../views/footer.html';

export default () => {
  const content = document.getElementById('root');

  const divElement = document.createElement('div');
  divElement.innerHTML = `
    ${navBar}
    ${adoptMe}
    ${footer}
  
`;
  content.appendChild(divElement);
};