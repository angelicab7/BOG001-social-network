import Swal from 'sweetalert2';
import * as firebase from 'firebase';
import navBar from '../views/navigation-bar.html';
import postsHTML from '../views/posts.html';
import footer from '../views/footer.html';
import { redirectIfNotAuthenticated } from '../model/authState';
import {
  getPosts, deletePosts, likePost, editPost,
} from '../model/posts';

async function onClickDelete(postId) {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#8A89C0',
    cancelButtonColor: '#fac8cd',
    confirmButtonText: 'Yes, delete it!',
  });

  if (result.value) {
    Swal.fire({
      title: 'Deleting post, please wait...',
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      await deletePosts(postId);
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success',
      );
      window.location.reload();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There was an unexpected error, please try again',
      });
    }
  }
}

/**
 * Esta función se ejecuta al hacer click en el botón de publicar cambios
 * @param {string} postId - Id del post
 * @param {string} message - Mensaje del post
 */
export async function onClickSaveChangesButton(postId, message) {
  // Se muestra un mensaje de cargando
  Swal.fire({
    title: 'Updating post, please wait...',
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  }); //creacion de promesas
  try {
    // Se ejecuta el cambio en la base de datos para guardar estos cambios
    await editPost(postId, message);
    // Se recarga la pagina para ver los cambios reflejados
    window.location.reload();
  } catch (error) {
    // Si hay algún error con firebase se muestra un mensaje de error
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'There was an unexpected error, please try again',
    });
  }
}

export function postTemplate(userId, userName, userPicture, postMessage, postImage, postId, likes) {
  const currentUserId = firebase.auth().currentUser.uid;
  const container = document.createElement('div');//Se crea un elemento de tipo div, aunque se pueden crear mas elementos del Html
  container.className = 'create-post margin-t-3 margin-b-3';
  container.dataset.user = userId;
  container.dataset.id = postId;

  // se evalua si el usuario le dio like y se encuentra registrado en la base de datos
  let userHasLikedThePost = likes.some((uid) => uid === currentUserId);

  const template = `
            <div class='profile'>
                <img src="${userPicture}" alt="profile_image" class="profPic" />
                <h5>${userName}</h5>
            </div>
            <h1 class='divider-posts'></h1>
            <div class='post-img'>
                <p class="post-message">${postMessage}</p>
                <img src='${postImage}' alt='try-pic' class='try-pic'>
            </div>
            <h1 class='divider-posts'></h1>
            <div class='interaction-section'>
                <i class="fas fa-thumbs-up like-button ${userHasLikedThePost ? 'liked' : ''}">
                  <span>Like</span>
                  <span class="likes-count">${likes.length}</span>
                </i>
                <i class="fas fa-comments"><span></span></i>
                ${currentUserId === userId ? '<div class="post-edit-actions"><i class="fas fa-edit edit-post"></i></div>' : ''}
                ${currentUserId === userId ? '<i class="fas fa-trash-alt delete-post"></i>' : ''}
            </div>
  `;

  container.innerHTML = template;//añade html dentro de un elemento

  // EDIT AND DELETE POSTS

  const deletePostButton = container.querySelector('.delete-post');
  if (deletePostButton) {
    deletePostButton.addEventListener('click', () => {
      onClickDelete(postId);
    });
  }

  const editPostButton = container.querySelector('.edit-post');
  if (editPostButton) {
    editPostButton.addEventListener('click', () => {
      // Creamos un nuevo elemento de tipo botón
      const publishButton = document.createElement('button');
      // A este nuevo botón le añadimos una clase para añadir estilos
      publishButton.className = 'save-changes-button posts-button';
      // A este nuevo botón le agregamos un texto
      publishButton.textContent = 'Publish'; //devuelve el contenido de texto del nodo especificado 

      // Seleccionamos el elemento post-edit-actions que contiene el botón edit post
      // Este botón edit post lo reemplazamos por el nuevo botón recién creado usando replaceChild
      // El nuevo botón servirá para publicar los cambios una vez editado el post
      container.querySelector('.post-edit-actions').replaceChild(publishButton, editPostButton);

      // Seleccionamos el elemento HTML que contiene el mensaje del post
      const postMessageElement = container.querySelector('.post-message');
      // Al mensaje del post le agregamos la clase editable para añadir estilos cuando es editable
      postMessageElement.classList.add('editable');
      // El container es toda la card del post. Al usar scrollIntoView
      // hacemos scroll hacia el inicio del post para tener mejor visibilidad del contenido que
      // vamos a editar
      container.scrollIntoView({
        behavior: 'smooth',
      });

      // Al mensaje del post le agregamos la propiedad contentEditable para volver este
      // elemento editable e interactivo y así el usuario pueda editar el mensaje
      postMessageElement.contentEditable = true;

      // Al nuevo botón de publicar le añadimos un evento de click
      publishButton.addEventListener('click', () => {
        // Cuando se hace click se llama esta función que editará el post
        onClickSaveChangesButton(postId, postMessageElement.textContent);
      });
    });
  }
  // LIKES BUTTON

  const likeButton = container.querySelector('.like-button');
  likeButton.addEventListener('click', () => {
    likePost(currentUserId, postId, userHasLikedThePost);
    const likesCount = container.querySelector('.likes-count');
    likeButton.classList.toggle('liked');
    if (userHasLikedThePost) {
      likesCount.textContent = parseInt(likesCount.textContent, 10) - 1;
      userHasLikedThePost = false;
    } else {
      likesCount.textContent = parseInt(likesCount.textContent, 10) + 1;
      userHasLikedThePost = true;
    }
  });

  return container;
}
// AUTHENTICATION
export default async () => {
  redirectIfNotAuthenticated();

  const content = document.getElementById('root');

  const divElement = document.createElement('div');
  divElement.innerHTML = `
    ${navBar}
    ${postsHTML}
    ${footer}
  
`;

  //Se le agrega al body el divElement que contiene toda la pagina de posts
  content.appendChild(divElement);
  const postsContainer = document.querySelector('#container-posts');
  const postsFragment = document.createDocumentFragment();

  const posts = await getPosts();

  posts.forEach((post) => {
    const {
      uid, userName, userPicture, imageURL, message, likes,
    } = post.data();
    const postId = post.id;

    postsFragment.appendChild(
      postTemplate(uid, userName, userPicture, message, imageURL, postId, likes),
    );
  });

  postsContainer.innerHTML = '';
  postsContainer.appendChild(postsFragment);
};
