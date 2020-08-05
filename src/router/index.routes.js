import Home from '../views/home'


/* ROUTES----*/
export const router = (route) => {
    switch (route) {
        case '#/Posts': {
            Home()
        }

        case '#/About-cats':
            return console.log('About!');
        case '#/Have-fun':
            return console.log('Have fun!');
        default:
            return console.log('404!');
    }
};
