/* ROUTES----*/

export const router = (route) => {
  switch (route) {
    case '#/Posts':
      return console.log('Home!');
    case '#/About-cats':
      return console.log('About!');
    case '#/Have-fun':
      return console.log('Have fun!');
    default:
      return console.log('404!');
  }
};
