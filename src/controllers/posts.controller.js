import navBar from '../views/navigation-bar.html';
import postsHTML from '../views/posts.html';
import footer from '../views/footer.html';
import { redirectIfNotAuthenticated } from '../model/authState';
import { getPosts } from '../model/posts';

function postTemplate(userId, userName, userPicture, postMessage, postImage, postId) {
  const container = document.createElement('div');
  container.className = 'create-post margin-t-3 margin-b-3';
  container.dataset.user = userId;
  container.dataset.id = postId;

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
                <i class="fas fa-thumbs-up"><span>Like</span></i>
                <i class="fas fa-comments"><span>Comment</span></i>
                <i class="fas fa-ellipsis-v"></i>
            </div>
  `;

  container.innerHTML = template;

  return container;
}

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
      uid, userName, userPicture, imageURL, message,
    } = post.data();
    const postId = post.id;

    postsFragment.appendChild(postTemplate(uid, userName, userPicture, message, imageURL, postId));
  });

  postsContainer.innerHTML = '';
  postsContainer.appendChild(postsFragment);
};
