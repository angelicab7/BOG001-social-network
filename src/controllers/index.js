import home from './home.controller';
import posts from './posts.controller';
import notFound from './404.controller';
import login from './login.controller';
import recover from './recover.controller';
import adoptme from './adoptme.controller';
import register from './register.controller';

const pages = {
  home,
  posts,
  notFound,
  login,
  recover,
  adoptme,
  register,
};
export { pages };
