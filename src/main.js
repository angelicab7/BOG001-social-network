// Add CSS Styles
import '../Styles/index.scss';
// import routes from index.routes.js
import { router } from './router/index.routes';

router(window.location.hash);
window.addEventListener('hashchange', () => {
  router(window.location.hash); // window.location gives you the URL
});
