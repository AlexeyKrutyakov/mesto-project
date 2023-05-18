import { addPlaceCard } from './card';
import { profile } from './data';

function postCard(placeName, placeImage, serverUrl, token) {
  fetch(serverUrl, {
    method: 'POST',
    headers: {
      authorization: token,
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
        if (place.owner._id === profile._id) {
          nonRemovable = false;
        } else {
          nonRemovable = true;
        }
        addPlaceCard(
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

function deleteCard(event, serverUrl, token) {
  const currentCard = event.target.closest('.card');
  const cardId = currentCard.id;
  fetch(`${serverUrl}/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: token,
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

export { postCard, getCards, deleteCard };
