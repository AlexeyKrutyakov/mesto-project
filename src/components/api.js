import { profileId } from '../index.js';
import { addPlaceCard, hasMyLike, renderLikesNumber } from './card';
import { changeAvatar, toggleSubmitStatus, renderProfile } from './utils';
import {
  profileSubmitBnt,
  placeSubmitBtn,
  avatarSubmitBtn,
} from './commonElements';

// data for server authorization
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-24',
  headers: {
    authorization: '9e2d263a-3d5a-40f2-a16e-27e8711676de',
    'Content-Type': 'application/json',
  },
};

function patchAvatar(link, config) {
  const url = `${config.baseUrl}/users/me/avatar`;
  const requestOptions = {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  };
  fetch(url, requestOptions)
    .then((res) => {
      return getResponseData(res);
    })
    .then((json) => {
      toggleSubmitStatus(avatarSubmitBtn);
      changeAvatar(json);
    })
    .catch((err) => {
      console.log('Error: ', err);
    });
}

function updateProfile(profileName, profileAbout, config) {
  const url = `${config.baseUrl}/users/me`;
  const requestOptions = {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileAbout,
    }),
  };
  fetch(url, requestOptions)
    .then((res) => {
      return getResponseData(res);
    })
    .then((json) => {
      toggleSubmitStatus(profileSubmitBnt);
      renderProfile(json);
    })
    .catch((err) => {
      console.log('Error: ', err);
    });
}

function getProfile() {
  const url = `${config.baseUrl}/users/me`;
  const requestOptions = {
    method: 'GET',
    headers: config.headers,
  };
  return fetch(url, requestOptions).then((res) => {
    return getResponseData(res);
  });
}

function postCard(placeName, placeImage, config) {
  const url = `${config.baseUrl}/cards`;
  const requestOptions = {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: placeName,
      link: placeImage,
    }),
  };
  fetch(url, requestOptions)
    .then((res) => {
      return getResponseData(res);
    })
    .then((json) => {
      toggleSubmitStatus(placeSubmitBtn);
      const placeLikes = json.likes.length;
      const cardId = json._id;
      const hasMyLike = false;
      const nonRemovable = false;
      addPlaceCard(
        placeLikes,
        cardId,
        placeName,
        placeImage,
        nonRemovable,
        hasMyLike
      );
    })
    .catch((err) => console.log('Error: ', err));
}

function getInitialCards() {
  const url = `${config.baseUrl}/cards`;
  const requestOptions = {
    method: 'GET',
    headers: config.headers,
  };
  return fetch(url, requestOptions).then((res) => {
    return getResponseData(res);
  });
}

function deleteCard(event, config) {
  const currentCard = event.target.closest('.card');
  const cardId = currentCard.id;
  const url = `${config.baseUrl}/cards/${cardId}`;
  const requestOptions = {
    method: 'DELETE',
    headers: config.headers,
  };
  fetch(url, requestOptions)
    .then((res) => {
      return getResponseData(res);
    })
    .then((json) => {
      if (json.message === 'Пост удалён') {
        currentCard.remove();
      }
    })
    .catch((err) => {
      console.log('Error: ', err);
    });
}

function putLike(config, card) {
  const url = `${config.baseUrl}/cards/likes/${card.id}`;
  const requestOptions = {
    method: 'PUT',
    headers: config.headers,
  };
  fetch(url, requestOptions)
    .then((res) => {
      return getResponseData(res);
    })
    .then((json) => {
      renderLikesNumber(card, json.likes.length);
    })
    .catch((err) => {
      console.log('Error: ', err);
    });
}

function deleteLike(config, card) {
  const url = `${config.baseUrl}/cards/likes/${card.id}`;
  const requestOptions = {
    method: 'DELETE',
    headers: config.headers,
  };
  fetch(url, requestOptions)
    .then((res) => {
      return getResponseData(res);
    })
    .then((json) => {
      renderLikesNumber(card, json.likes.length);
    })
    .catch((err) => {
      console.log('Error: ', err);
    });
}

function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
}

export {
  config,
  patchAvatar,
  updateProfile,
  getProfile,
  postCard,
  getInitialCards,
  deleteCard,
  putLike,
  deleteLike,
};
