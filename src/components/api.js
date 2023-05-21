// data for server authorization
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-24',
  headers: {
    authorization: '9e2d263a-3d5a-40f2-a16e-27e8711676de',
    'Content-Type': 'application/json',
  },
};

function getProfile() {
  const url = `${config.baseUrl}/users/me`;
  const requestOptions = {
    method: 'GET',
    headers: config.headers,
  };
  return fetch(url, requestOptions)
    .then((res) => {
      return getResponseData(res);
    })
    .catch((err) => {
      console.log('Error: ', err);
    });
}

function getInitialCards() {
  const url = `${config.baseUrl}/cards`;
  const requestOptions = {
    method: 'GET',
    headers: config.headers,
  };
  return fetch(url, requestOptions)
    .then((res) => {
      return getResponseData(res);
    })
    .catch((err) => {
      console.log('Error: ', err);
    });
}

function patchAvatar(link) {
  const url = `${config.baseUrl}/users/me/avatar`;
  const requestOptions = {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  };
  return fetch(url, requestOptions)
    .then((res) => {
      return getResponseData(res);
    })
    .catch((err) => {
      console.log('Error: ', err);
    });
}

function patchProfile(profileName, profileAbout) {
  const url = `${config.baseUrl}/users/me`;
  const requestOptions = {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileAbout,
    }),
  };
  return fetch(url, requestOptions)
    .then((res) => {
      return getResponseData(res);
    })
    .catch((err) => {
      console.log('Error: ', err);
    });
}

function postCard(placeName, placeImage) {
  const url = `${config.baseUrl}/cards`;
  const requestOptions = {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: placeName,
      link: placeImage,
    }),
  };
  return fetch(url, requestOptions)
    .then((res) => {
      return getResponseData(res);
    })
    .catch((err) => {
      console.log('Error: ', err);
    });
}

function deleteCard(card) {
  const cardId = card.dataset.id;
  const url = `${config.baseUrl}/cards/${cardId}`;
  const requestOptions = {
    method: 'DELETE',
    headers: config.headers,
  };
  return fetch(url, requestOptions)
    .then((res) => {
      return getResponseData(res);
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
  return fetch(url, requestOptions)
    .then((res) => {
      return getResponseData(res);
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
  return fetch(url, requestOptions)
    .then((res) => {
      return getResponseData(res);
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
  patchProfile,
  getProfile,
  postCard,
  getInitialCards,
  deleteCard,
  putLike,
  deleteLike,
};
