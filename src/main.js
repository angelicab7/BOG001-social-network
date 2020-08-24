// Add CSS Styles
import '../Styles/index.scss';
// import routes from index.routes.js
import * as firebase from 'firebase/app';
import { router } from './router/index.routes';
import { navBarController } from './controllers/navbar.constroller';
import { authState } from './model/authState';
// Firebase App (the core Firebase SDK) is always required and must be listed first

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDjekAtuLSwIFPBrX41c7o-cKp_qNDFx7o',
  authDomain: 'smelly-cat-1e196.firebaseapp.com',
  databaseURL: 'https://smelly-cat-1e196.firebaseio.com',
  projectId: 'smelly-cat-1e196',
  storageBucket: 'smelly-cat-1e196.appspot.com',
  messagingSenderId: '235577440159',
  appId: '1:235577440159:web:043313cb5a17732f12afaa',
  measurementId: 'G-L4RSNDPKSM',
};

if (!window.location.hash) {
  window.location.hash = '#/';
}

firebase.initializeApp(firebaseConfig);

function init() {
  authState();
  navBarController();
}

router(window.location.hash);
init();
window.addEventListener('hashchange', () => {
  router(window.location.hash); // window.location gives you the URL
  navBarController();
});
