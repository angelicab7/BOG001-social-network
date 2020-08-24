import Swal from 'sweetalert2';
import navBar from '../views/navigation-bar.html';
import createPost from '../views/createPost.html';
import footer from '../views/footer.html';
import { redirectIfNotAuthenticated } from '../model/authState';
import { uploadPostImage } from '../model/firebaseStorage';
import { insertPostIntoDatabase } from '../model/posts';

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
  createPostsForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // cancelar evento de reinicio del formulario
    const textArea = document.querySelector('#text-area').value;
    const imageInput = document.querySelector('#imageInput').files[0];
    Swal.fire({
      title: 'Uploading image, please wait...',
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const downloadURL = await uploadPostImage(imageInput);
      Swal.fire({
        title: 'Creating post, please wait...',
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      await insertPostIntoDatabase(textArea, downloadURL);
      Swal.close();
      window.location.hash = '#/Posts';
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There was an unexpected error, please try again',
      });
    }
  });
};
