import { pages } from '../controllers/index';

/* ROUTES----*/

const content = document.getElementById('root');
export const router = (route) => {
  content.innerHTML = '';
  switch (route) {
    case '#/': {
      return content.appendChild(pages.home());
    }
    case '#/Posts': {
      return content.appendChild(pages.posts());
    }
    case '#/Login': {
      return content.appendChild(pages.login());
    }
    case '#/Recover': {
      return content.appendChild(pages.recover());
    }
    case '#/Adoption': {
      return content.appendChild(pages.adoptme());
    }
    case '#/Register': {
      return content.appendChild(pages.register());
    }

    default:
      return content.appendChild(pages.notFound());
  }
};
