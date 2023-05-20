import './index.css';

import {
  profileSection,
  cardsSection,
  validationParameters,
} from './components/commonElements.js';

import { config } from './components/api.js';

import { enableValidation } from './components/validate.js';

import { getInitialCards, getProfile } from './components/api.js';

import { clickHandler, renderProfile } from './components/utils.js';

import { addPlaceCard, hasMyLike } from './components/card';

let profileId = '';

Promise.all([getProfile(), getInitialCards()])
  .then(([profileJson, cardsJson]) => {
    profileId = profileJson._id;
    renderProfile(profileJson);

    cardsJson.forEach((card) => {
      let nonRemovable;
      if (card.owner._id === profileId) {
        nonRemovable = false;
      } else {
        nonRemovable = true;
      }
      addPlaceCard(
        card.likes.length,
        card._id,
        card.name,
        card.link,
        nonRemovable,
        hasMyLike(card, profileId),
        card.alt
      );
    });
  })
  .catch(([getProfileErr, getInitialCardsErr]) => {
    console.log('Error: ', getProfileErr);
    console.log('Error: ', getInitialCardsErr);
  });

// change profile info
function editProfileInfo(json) {
  toggleSubmitStatus(profileSubmitBnt);
  renderProfile(json);
}

// post card
function addNewPlace(json) {
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
}

function deletePlace(json) {
  if (json.message === 'Пост удалён') {
    currentCard.remove();
  }
}

function addLike(json) {
  renderLikesNumber(card, json.likes.length);
}

// add listeners
// profileSection.addEventListener('click', clickHandler);
// cardsSection.addEventListener('click', clickHandler);

// enable forms validation
enableValidation(validationParameters);

export { profileId };
