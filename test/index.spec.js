// importamos la funcion que vamos a testear
import * as firebase from 'firebase';
import Swal from 'sweetalert2';
import { postTemplate } from '../src/controllers/posts.controller';

jest.mock('firebase');
jest.mock('sweetalert2');

describe('Posts test', () => {
  const currentUserId = 'myCustomUserID';

  beforeEach(() => {
    delete window.location;
    window.location = { reload: jest.fn() };

    jest.spyOn(firebase, 'auth').mockImplementation(() => ({
      currentUser: {
        uid: currentUserId,
      },
    }));

    jest.spyOn(firebase, 'firestore').mockImplementation(() => ({
      collection: jest.fn(() => ({
        doc: jest.fn(() => ({
          update: jest.fn(() => new Promise((resolve) => resolve())),
          delete: jest.fn(() => new Promise((resolve) => resolve())),
        })),
      })),
    }));

    jest.spyOn(Swal, 'fire').mockImplementation(() => new Promise((resolve) => resolve({ value: true })));
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('When the user is not the author of the post should not show the edit and delete buttons', () => {
    const template = postTemplate('sdafasdfasdf', 'Angelica Bonilla', 'https://picsum.photos/200/300', 'Hola', 'https://picsum.photos/200', '22558854852', [currentUserId]);
    expect(template.querySelector('.delete-post')).toBeNull();
    expect(template.querySelector('.edit-post')).toBeNull();
  });

  it('When the user is the author of the post should show the edit and delete buttons', () => {
    const template = postTemplate(currentUserId, 'Angelica Bonilla', 'https://picsum.photos/200/300', 'Hola', 'https://picsum.photos/200', '22558854852', [currentUserId]);
    expect(template.querySelector('.delete-post')).not.toBeNull();
    expect(template.querySelector('.edit-post')).not.toBeNull();
  });

  it('When the user has not liked the post, the like button should not be selected', () => {
    const template = postTemplate(currentUserId, 'Angelica Bonilla', 'https://picsum.photos/200/300', 'Hola', 'https://picsum.photos/200', '22558854852', ['sadfasdf']);
    expect(template.querySelector('.like-button').classList.contains('liked')).toBeFalsy();
  });

  it('When the user has liked the post, the like button should be selected', () => {
    const template = postTemplate(currentUserId, 'Angelica Bonilla', 'https://picsum.photos/200/300', 'Hola', 'https://picsum.photos/200', '22558854852', [currentUserId]);
    expect(template.querySelector('.like-button').classList.contains('liked')).toBeTruthy();
  });

  it('It should show the likes count correctly', () => {
    const template = postTemplate(currentUserId, 'Angelica Bonilla', 'https://picsum.photos/200/300', 'Hola', 'https://picsum.photos/200', '22558854852', [currentUserId, 'sdfasdfasd']);
    expect(template.querySelector('.likes-count').textContent).toBe('2');
  });

  it('It should add 1 like when like button is pressed and the user has not liked the post', () => {
    const template = postTemplate(currentUserId, 'Angelica Bonilla', 'https://picsum.photos/200/300', 'Hola', 'https://picsum.photos/200', '22558854852', ['sdfasdfasd']);
    expect(template.querySelector('.like-button').classList.contains('liked')).toBeFalsy();
    expect(template.querySelector('.likes-count').textContent).toBe('1');
    template.querySelector('.like-button').click();
    expect(template.querySelector('.like-button').classList.contains('liked')).toBeTruthy();
    expect(template.querySelector('.likes-count').textContent).toBe('2');
  });

  it('It should remove 1 like when like button is pressed and the user has liked the post', () => {
    const template = postTemplate(currentUserId, 'Angelica Bonilla', 'https://picsum.photos/200/300', 'Hola', 'https://picsum.photos/200', '22558854852', ['sdfasdfasd', currentUserId]);
    expect(template.querySelector('.like-button').classList.contains('liked')).toBeTruthy();
    expect(template.querySelector('.likes-count').textContent).toBe('2');
    template.querySelector('.like-button').click();
    expect(template.querySelector('.like-button').classList.contains('liked')).toBeFalsy();
    expect(template.querySelector('.likes-count').textContent).toBe('1');
  });

  it('It should delete the post correctly', async () => {
    const postId = '22558854852';
    const template = postTemplate(currentUserId, 'Angelica Bonilla', 'https://picsum.photos/200/300', 'Hola', 'https://picsum.photos/200', postId, ['sdfasdfasd', currentUserId]);
    template.querySelector('.delete-post').click();

    const firestoreMock = firebase.firestore.mock.results[0].value;
    const firestoreCollectionMock = firestoreMock.collection.mock.results[0].value;
    const firestoreDocMock = firestoreCollectionMock.doc.mock.results[0].value;
    const firestoreUpdateDocMock = firestoreDocMock.update.mock;
    expect(firestoreCollectionMock.doc).toHaveBeenCalledWith(postId);
    expect(firestoreUpdateDocMock.calls).toHaveLength(1);

    // Let's wait a tick until the async firestore call happens
    setTimeout(() => {
      expect(window.location.reload).toHaveBeenCalled();
    }, 0);
  });
});
