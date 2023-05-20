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
  profileSubmitBnt,
} from './components/commonElements.js';

import { enableValidation, toggleButtonState } from './components/validate.js';

import { getInitialCards, getProfile } from './components/api.js';

import { createCard, addCard, isMyCard } from './components/card';

import { clickHandler } from './components/utils';

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

// enable forms validation

enableValidation(validationParameters);

// initial page

Promise.all([getProfile(), getInitialCards()])
  .then(([profileJson, cardsJson]) => {
    profileId = profileJson._id;
    renderProfile(profileJson);

    cardsJson.forEach((card) => {
      const nonRemovable = !isMyCard(card, profileId);
      const newCard = createCard(
        card.likes.length,
        card._id,
        card.name,
        card.link,
        nonRemovable,
        card.alt
      );
      addCard(newCard);
    });
  })
  .catch(([getProfileErr, getInitialCardsErr]) => {
    console.log('Error: ', getProfileErr);
    console.log('Error: ', getInitialCardsErr);
  });

// add listeners
profilePopup.addEventListener('click', clickHandler);
profileForm.addEventListener('submit', profileSubmitBnt);

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
  addCard(placeLikes, cardId, placeName, placeImage, nonRemovable, hasMyLike);
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

function openAvatarPopup() {
  openPopup(avatarPopup);

  avatarPopup.addEventListener('click', clickHandler);
  avatarForm.addEventListener('submit', submitAvatarForm);
}
function openPlacePopup() {
  openPopup(placePopup);

  // clear old name and text in input fields
  placeForm.reset();

  // validate inputs
  validateInput(placeForm, placeNameInput, validationParameters);
  validateInput(placeForm, placeImageInput, validationParameters);
  toggleButtonState(
    placeForm,
    [placeNameInput, placeImageInput],
    validationParameters
  );

  // add listeners for popup buttons
  placePopup.addEventListener('click', clickHandler);
  placeForm.addEventListener('submit', submitPlaceForm);
}

function openEnlargeImagePopup(event) {
  const imageLink = event.target.src;
  const placeName = event.target
    .closest(`.${cardElementClass}`)
    .querySelector(`.${cardNameClass}`).textContent;

  enlargeImage.src = imageLink;
  enlargeImage.alt = 'Увеличенное изображение места ' + placeName;
  figcaption.textContent = placeName;

  enlargeImagePopup.addEventListener('click', clickHandler);

  openPopup(enlargeImagePopup);
}

// add listeners
// profileSection.addEventListener('click', clickHandler);
// cardsSection.addEventListener('click', clickHandler);

export {
  profileId,
  changeAvatar,
  openProfilePopup,
  openAvatarPopup,
  openPlacePopup,
  openEnlargeImagePopup,
};
