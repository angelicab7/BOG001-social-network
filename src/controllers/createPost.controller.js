import navBar from '../views/navigation-bar.html';
import createPost from '../views/createPost.html';
import footer from '../views/footer.html';
import { redirectIfNotAuthenticated } from '../model/authState';

export default () => {
  redirectIfNotAuthenticated();

  const content = document.getElementById('root');

  const divElement = document.createElement('div');
  divElement.innerHTML = `
      ${navBar}
      ${createPost}
      ${footer}
    
  `;
  content.appendChild(divElement);
};
