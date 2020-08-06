import views from '../views/posts.html';

export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = views;
  return divElement;
};
