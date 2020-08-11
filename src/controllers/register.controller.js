import navBar from '../views/navigation-bar.html';
import register from '../views/register.html';
import footer from '../views/footer.html';

export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = `
    ${navBar}
    ${register}
    ${footer}
  
`;
  return divElement;
};