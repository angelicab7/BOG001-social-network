import navBar from '../views/navigation-bar.html';
import notFound from '../views/404.html';
import footer from '../views/footer.html';


export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = `
    ${navBar}
    ${notFound}
    ${footer}
`;

  return divElement;
};
