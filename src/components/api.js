import { addPlaceCard } from './card';
import { profileId } from './data';
import { renderProfile } from './utils';

// data for server authorization
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-24',
  headers: {
    authorization: '9e2d263a-3d5a-40f2-a16e-27e8711676de',
    'Content-Type': 'application/json',
  },
};

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
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Error: ${response.status}`);
      }
    })
    .then((json) => {
      renderProfile(json);
    })
    .catch((err) => {
      console.log('Error: ', err);
    });
}

function getProfileInfo(config) {
  const url = `${config.baseUrl}/users/me`;
  const requestOptions = {
    method: 'GET',
    headers: config.headers,
  };
  fetch(url, requestOptions)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Error: ${response.status}`);
      }
    })
    .then((json) => {
      renderProfile(json);
    })
    .catch((err) => {
      console.log('Error: ', err);
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
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Error: ${response.status}`);
      }
    })
    .then((json) => {
      const cardId = json._id;
      addPlaceCard(cardId, placeName, placeImage, false);
    })
    .catch((err) => console.log('Error: ', err));
}

function getCards(config) {
  const url = `${config.baseUrl}/cards`;
  const requestOptions = {
    method: 'GET',
    headers: config.headers,
  };
  return fetch(url, requestOptions)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Error: ${response.status}`);
      }
    })
    .then((json) => {
      json.forEach((place) => {
        let nonRemovable;
        if (place.owner._id === profileId) {
          nonRemovable = false;
        } else {
          nonRemovable = true;
        }
        addPlaceCard(
          place.likes.length,
          place._id,
          place.name,
          place.link,
          nonRemovable,
          place.alt
        );
      });
    })
    .catch((err) => {
      console.log('Error: ', err);
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
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
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

function putLike(config, cardId) {
  const url = `${config.baseUrl}/cards/likes/${cardId}`;
  const requestOptions = {
    method: 'PUT',
    headers: config.headers,
  };
  fetch(url, requestOptions)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Error: ${response.status}`);
      }
    })
    .then((json) => {
      console.log(json);
    })
    .catch((err) => {
      console.log('Error: ', err);
    });
}

function deleteLike(config, cardId) {
  const url = `${config.baseUrl}/cards/likes/${cardId}`;
  const requestOptions = {
    method: 'DELETE',
    headers: config.headers,
  };
  fetch(url, requestOptions)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Error: ${response.status}`);
      }
    })
    .then((json) => {
      console.log(json);
    })
    .catch((err) => {
      console.log('Error: ', err);
    });
}

export {
  config,
  updateProfile,
  getProfileInfo,
  postCard,
  getCards,
  deleteCard,
  putLike,
  deleteLike,
};
