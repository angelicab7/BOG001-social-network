import { pages } from '../controllers/index';

/* ROUTES----*/

const content = document.getElementById('root');
export const router = (route) => {
  content.innerHTML = '';
  switch (route) {
    case '#/': {
      return pages.home();
    }
    case '#/Posts': {
      return pages.posts();
    }
    case '#/Login': {
      return pages.login();
    }
    case '#/Recover': {
      return pages.recover();
    }
    case '#/Adoption': {
      return pages.adoptme();
    }
    case '#/Register': {
      return pages.register();
    }

    default:
      return pages.notFound();
  }
};
