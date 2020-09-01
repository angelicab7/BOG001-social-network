import Swal from 'sweetalert2';
import * as firebase from 'firebase';
import navBar from '../views/navigation-bar.html';
import postsHTML from '../views/posts.html';
import footer from '../views/footer.html';
import { redirectIfNotAuthenticated } from '../model/authState';
import { getPosts, deletePosts, likePost } from '../model/posts';

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

export function postTemplate(userId, userName, userPicture, postMessage, postImage, postId, likes) {
  const currentUserId = firebase.auth().currentUser.uid;
  const container = document.createElement('div');
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
                <h6>${postMessage}</h6>
                <img src='${postImage}' alt='try-pic' class='try-pic'>
            </div>
            <h1 class='divider-posts'></h1>
            <div class='interaction-section'>
                <i class="fas fa-thumbs-up like-button ${userHasLikedThePost ? 'liked' : ''}">
                  <span>Like</span>
                  <span class="likes-count">${likes.length}</span>
                </i>
                <i class="fas fa-comments"><span>Comment</span></i>
                ${currentUserId === userId ? '<i class="fas fa-edit edit-post"></i>' : ''}
                ${currentUserId === userId ? '<i class="fas fa-trash-alt delete-post"></i>' : ''}
            </div>
  `;

  container.innerHTML = template;

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
      console.log('Edit post');
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
