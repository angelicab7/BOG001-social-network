import navBar from '../views/navigation-bar.html';
import posts from '../views/posts.html';
import footer from '../views/footer.html';

export default () => {
  const content = document.getElementById('root');
  
  const divElement = document.createElement('div');
  divElement.innerHTML = `
    ${navBar}
    ${posts}
    ${footer}
  
`;
  content.appendChild(divElement);
};
