import './index.css';

import {
  avatarImage,
  profilePopup,
  profileName,
  profileAbout,
  profileForm,
  profileNameInput,
  profileTextInput,
  validationParameters,
} from './components/commonElements.js';

import { enableValidation, toggleButtonState } from './components/validate.js';

import { getInitialCards, getProfile } from './components/api.js';

import { addPlaceCard, hasMyLike } from './components/card';

let profileId = '';

// functions works with avatar

function changeAvatar(json) {
  avatarImage.src = json.avatar;
}

// functions works with profile

function renderProfile(json) {
  profileName.textContent = json.name;
  profileAbout.textContent = json.about;
  changeAvatar(json);
}

// initial page

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

// functions works with profile
function openProfilePopup() {
  openPopup(profilePopup);

  // initiate input values with current profile data
  profileNameInput.value = profileName.textContent;
  profileTextInput.value = profileAbout.textContent;

  // validate input values
  validateInput(profileForm, profileNameInput, validationParameters);
  validateInput(profileForm, profileTextInput, validationParameters);
  toggleButtonState(
    profileForm,
    [profileNameInput, profileTextInput],
    validationParameters
  );
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

function removeLike(json) {
  renderLikesNumber(card, json.likes.length);
}

// add listeners
// profileSection.addEventListener('click', clickHandler);
// cardsSection.addEventListener('click', clickHandler);

// enable forms validation
enableValidation(validationParameters);

export { profileId, changeAvatar, openProfilePopup };
