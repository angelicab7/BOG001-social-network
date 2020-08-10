// Add CSS Styles
import '../Styles/index.scss';
// import routes from index.routes.js
import { router } from './router/index.routes';
import { navBarController } from './controllers/navbar.constroller';

function init() {
  navBarController();
}

router(window.location.hash);
init();
window.addEventListener('hashchange', () => {
  router(window.location.hash); // window.location gives you the URL
});
