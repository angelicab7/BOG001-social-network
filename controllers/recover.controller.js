import navBar from '../views/navigation-bar.html';
import recover from '../views/recover.html';
import footer from '../views/footer.html';

export default () => {
  const content = document.getElementById('root');

  const divElement = document.createElement('div');
  divElement.innerHTML = `
    ${navBar}
    ${recover}
    ${footer}
  
`;
  content.appendChild(divElement);
};
