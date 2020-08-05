//Add CSS Styles 
import './main.scss';
//import routes from index.routes.js
import {router} from './router/index.routes'

window.addEventListener('hashchange', () =>{ 
 router(window.location.hash) //window.location gives you the URL
})