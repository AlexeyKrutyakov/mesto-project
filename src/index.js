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
  placePopup,
  placeForm,
  placeSubmitBtn,
  editAvatarBtn,
  avatarPopup,
  submitStatus,
  editProfileBtn,
  addPlaceBtn,
  placeNameInput,
  placeImageInput,
} from './components/commonElements.js';

import {
  enableValidation,
  hideInputError,
  toggleButtonState,
} from './components/validate.js';

import {
  getInitialCards,
  getProfile,
  patchAvatar,
  patchProfile,
} from './components/api.js';

import { createCard, addCard, isMyCard } from './components/card';

import {
  clickHandler,
  hideInputsErrors,
  keydownHandler,
  renderSubmit,
  setSubmitActive,
  setSubmitInactive,
} from './components/utils';

import { closePopup, openPopup } from './components/modal';

let profileId = '';

// enable forms validation

enableValidation(validationParameters);

// initial page

Promise.all([getProfile(), getInitialCards()])
  .then(([profileJson, cardsJson]) => {
    profileId = profileJson._id;
    renderProfileInfo(profileJson.name, profileJson.about);
    renderAvatar(profileJson.avatar);

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

editAvatarBtn.addEventListener('click', openAvatarPopup);
editProfileBtn.addEventListener('click', openProfilePopup);
addPlaceBtn.addEventListener('click', openPlacePopup);
avatarForm.addEventListener('submit', submitAvatarForm);
profileForm.addEventListener('submit', submitProfileForm);
placeForm.addEventListener('submit', submitPlaceForm);

// functions works with profile

function renderProfileInfo(name, about) {
  profileName.textContent = name;
  profileAbout.textContent = about;
}

function openProfilePopup() {
  openPopup(profilePopup);
  hideInputsErrors(profileForm);

  // initiate input values with current profile data
  profileNameInput.value = profileName.textContent;
  profileTextInput.value = profileAbout.textContent;

  setSubmitActive(profileSubmitBnt);
}

function submitProfileForm(event) {
  // undo standard sumbit behavior
  event.preventDefault();

  renderSubmit(profileSubmitBnt, submitStatus.saving);

  // update profile
  patchProfile(profileNameInput.value, profileTextInput.value)
    .then((json) => {
      renderProfileInfo(json.name, json.about);
      closePopup(profilePopup);
    })
    .catch((err) => {
      console.log('Error: ', err);
    })
    .finally(() => {
      renderSubmit(profileSubmitBnt, submitStatus.save);
    });
}

// functions works with avatar

function renderAvatar(link) {
  avatarImage.src = link;
}

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

  // change avatar
  patchAvatar(avatarImageInput.value)
    .then((json) => {
      renderAvatar(json.avatar);
      closePopup(avatarPopup);
    })
    .catch((err) => {
      console.log('Error: ', err);
    })
    .finally(() => {
      renderSubmit(avatarSubmitBtn, submitStatus.save);
    });
}

// functions works with cards

function openPlacePopup() {
  placeForm.reset();
  hideInputError(placeForm, placeNameInput, placeImageInput);
  setSubmitInactive(placeSubmitBtn);
  openPopup(placePopup);
}
function submitPlaceForm(event) {
  // undo standard sumbit behavior
  event.preventDefault();

  postCard(placeNameInput.value, placeImageInput.value, config);
  placeForm.reset();

  closePopup(placePopup);
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
