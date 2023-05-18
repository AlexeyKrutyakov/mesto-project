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
    .then(() => addPlaceCard(placeName, placeImage, false))
    .catch((err) => console.log('Error: ', err));
}

function getCards(url, params) {
  return fetch(url, params)
    .then((res) => res.json())
    .then((result) => {
      result.forEach((place) => {
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

export { postCard, getCards };
