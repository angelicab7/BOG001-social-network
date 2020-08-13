import * as firebase from 'firebase/app';

let isAuthenticated = false;
let isLoadingAuthState = true;

export function redirectToLogin() {
  window.location.hash = '#/Login';
}

export function redirectIfNotAuthenticated() {
  const isProtectedRoute = ['#/Posts', '#/Adoption'].includes(window.location.hash);

  if (isProtectedRoute && !isAuthenticated && !isLoadingAuthState) {
    redirectToLogin();
  }
}

export function authState() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      isAuthenticated = true;
    } else {
      isAuthenticated = false;
    }

    isLoadingAuthState = false;

    redirectIfNotAuthenticated();
  });
}
