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

  const createPostsForm = document.querySelector('#create-post');
  createPostsForm.addEventListener('submit', (e) => {
    e.preventDefault(); // cancelar evento de reinicio del formulario
    const textArea = document.querySelector('#text-area').value;
    console.log(textArea);
  });
};
