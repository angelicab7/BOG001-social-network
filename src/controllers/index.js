import home from './home.controller';
import posts from './posts.controller';
import notFound from './404.controller';
import login from './login.controller';
import recover from './recover';

const pages = {
  home,
  posts,
  notFound,
  login,
  recover,
};
export { pages };
