import views from '../views/login.html';

export default () => {
  const divElement = document.createElement('div');
  divElement.innerHTML = views;
  return divElement;
};