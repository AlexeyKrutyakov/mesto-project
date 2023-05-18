import { addPlaceCard } from './card';
import { profileId } from './data';
import { renderProfile } from './utils';

function updateProfile(profileName, profileAbout, serverInfo) {
  fetch(`${serverInfo.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: serverInfo.token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: profileName,
      about: profileAbout,
    }),
  })
    .then((response) => {
      if (response.ok) {
        console.log('response: ', response);
        return response.json();
      }
    })
    .then((json) => {
      renderProfile(json);
    })
    .catch((err) => {
      console.log('Error: ', err);
    });
}

function getProfileInfo(serverInfo) {
  fetch(`${serverInfo.baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      authorization: serverInfo.token,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((json) => {
      renderProfile(json);
    })
    .catch((err) => {
      console.log('Error: ', err);
    });
}

function postCard(placeName, placeImage, serverInfo) {
  fetch(serverInfo.cardsUrl, {
    method: 'POST',
    headers: {
      authorization: serverInfo.token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: placeName,
      link: placeImage,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((json) => {
      const cardId = json._id;
      addPlaceCard(cardId, placeName, placeImage, false);
    })
    .catch((err) => console.log('Error: ', err));
}

function getCards(url, params) {
  return fetch(url, params)
    .then((response) => response.json())
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

function deleteCard(event, serverInfo) {
  const currentCard = event.target.closest('.card');
  const cardId = currentCard.id;
  fetch(`${serverInfo.cardsUrl}/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: serverInfo.token,
    },
  })
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

export { updateProfile, getProfileInfo, postCard, getCards, deleteCard };
