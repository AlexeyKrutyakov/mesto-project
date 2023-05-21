import './index.css';

import {
  avatarImage,
  avatarForm,
  avatarImageInput,
  avatarSubmitBtn,
  profilePopup,
  profileName,
  profileAbout,
  profileForm,
  profileNameInput,
  profileTextInput,
  profileSubmitBnt,
  validationParameters,
  placeForm,
  placeSubmitBtn,
  editAvatarBtn,
  avatarPopup,
  submitStatus,
} from './components/commonElements.js';

import {
  enableValidation,
  hideInputError,
  toggleButtonState,
} from './components/validate.js';

import { getInitialCards, getProfile, patchAvatar } from './components/api.js';

import { createCard, addCard, isMyCard } from './components/card';

import {
  clickHandler,
  keydownHandler,
  renderSubmit,
  setSubmitInactive,
} from './components/utils';

import { closePopup, openPopup } from './components/modal';

let profileId = '';

// functions works with avatar

function renderAvatar(link) {
  avatarImage.src = link;
}

// functions works with profile

function renderProfile(json) {
  profileName.textContent = json.name;
  profileAbout.textContent = json.about;
  renderAvatar(json.avatar);
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

avatarForm.addEventListener('submit', submitAvatarForm);
profileForm.addEventListener('submit', submitProfileForm);
placeForm.addEventListener('submit', submitPlaceForm);
editAvatarBtn.addEventListener('click', openAvatarPopup);

// profilePopup.addEventListener('click', clickHandler);
// profileSection.addEventListener('click', clickHandler);
// cardsSection.addEventListener('click', clickHandler);

// change avatar
function openAvatarPopup() {
  avatarForm.reset();
  setSubmitInactive(avatarSubmitBtn);
  hideInputError(avatarForm, avatarImageInput, validationParameters);
  openPopup(avatarPopup);
}

function submitAvatarForm(event) {
  // undo standard sumbit behavior
  event.preventDefault();

  renderSubmit(avatarSubmitBtn, submitStatus.saving);

  patchAvatar(avatarImageInput.value)
    .then((json) => {
      renderAvatar(json.avatar);
      closePopup(avatarPopup);
    })
    .catch((err) => {
      console.log('Error: ', err);
    })
    .finally(renderSubmit(avatarSubmitBtn, submitStatus.save));
}

// change profile info
function editProfileInfo(json) {
  // toggleSubmitStatus(profileSubmitBnt);
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
  // toggleSubmitStatus(placeSubmitBtn);
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

function submitProfileForm(event) {
  // undo standard sumbit behavior
  event.preventDefault();

  // update profile
  patchProfile(profileNameInput.value, profileTextInput.value, config);
  // document.removeEventListener('keydown', keydownHandler);
  closePopup(profilePopup);
}

function submitPlaceForm(event) {
  // undo standard sumbit behavior
  event.preventDefault();

  postCard(placeNameInput.value, placeImageInput.value, config);
  placeForm.reset();

  closePopup(placePopup);
}

export {
  profileId,
  renderAvatar,
  openProfilePopup,
  openAvatarPopup,
  openPlacePopup,
  openEnlargeImagePopup,
  submitProfileForm,
  submitAvatarForm,
  submitPlaceForm,
};

// to-do
// all works
// keyHandler

// card.js
// modal.js
// utils.js
// validate.js
// api.js
