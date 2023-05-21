import './index.css';

import {
  addPlaceBtn,
  avatarForm,
  avatarImage,
  avatarImageInput,
  avatarPopup,
  avatarSubmitBtn,
  cardElementClass,
  cardLikeBtnActiveClass,
  cardNameClass,
  editAvatarBtn,
  editProfileBtn,
  enlargeImage,
  enlargeImagePopup,
  figcaption,
  placeForm,
  placeImageInput,
  placeNameInput,
  placePopup,
  placeSubmitBtn,
  profileAbout,
  profileForm,
  profileName,
  profileNameInput,
  profilePopup,
  profileSubmitBnt,
  profileTextInput,
  submitStatus,
  validationParameters,
} from './components/commonElements.js';

import { enableValidation, hideInputError } from './components/validate.js';

import {
  deleteCard,
  deleteLike,
  getInitialCards,
  getProfile,
  patchAvatar,
  patchProfile,
  postCard,
  putLike,
} from './components/api.js';

import {
  addCard,
  createCard,
  hasMyLike,
  isMyCard,
  renderLikesNumber,
} from './components/card';

import {
  hideInputsErrors,
  renderSubmitStatus,
  setSubmitActive,
  setSubmitInactive,
  show,
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
      const likedByMe = hasMyLike(card, profileId);
      const newCard = createCard(
        card.likes.length,
        card._id,
        card.name,
        card.link,
        nonRemovable,
        likedByMe,
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

  renderSubmitStatus(profileSubmitBnt, submitStatus.saving);

  // update profile
  patchProfile(profileNameInput.value, profileTextInput.value)
    .then((json) => {
      renderProfileInfo(json.name, json.about);
      closePopup(profilePopup);
    })
    .catch((err) => {
      show(err);
    })
    .finally(() => {
      renderSubmitStatus(profileSubmitBnt, submitStatus.save);
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

  renderSubmitStatus(avatarSubmitBtn, submitStatus.saving);

  // change avatar
  patchAvatar(avatarImageInput.value)
    .then((json) => {
      renderAvatar(json.avatar);
      closePopup(avatarPopup);
    })
    .catch((err) => {
      show(err);
    })
    .finally(() => {
      renderSubmitStatus(avatarSubmitBtn, submitStatus.save);
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

  renderSubmitStatus(placeSubmitBtn, submitStatus.saving);

  postCard(placeNameInput.value, placeImageInput.value)
    .then((json) => {
      const newCard = createCard(
        json.likes.length,
        json._id,
        json.name,
        json.link,
        false,
        false
      );
      addCard(newCard);
      closePopup(placePopup);
    })
    .catch((err) => {
      show(err);
    })
    .finally(() => {
      renderSubmitStatus(placeSubmitBtn, submitStatus.save);
    });
}

function removePlace(evt) {
  const card = evt.target.closest('.card');
  deleteCard(card)
    .then((json) => {
      if (json.message === 'Пост удалён') {
        card.remove();
      }
    })
    .catch((err) => {
      show(err);
    });
}

function toggleLike(event) {
  const likeBtn = event.target;
  const card = likeBtn.closest(`.${cardElementClass}`);
  const likesNumberElement = card.querySelector('.card__likes-number');
  const isLikeActive = likeBtn.classList.contains(cardLikeBtnActiveClass);
  if (isLikeActive) {
    deleteLike(card)
      .then((json) => {
        likeBtn.classList.remove(cardLikeBtnActiveClass);
        renderLikesNumber(likesNumberElement, json.likes.length);
      })
      .catch((err) => show(err));
  } else {
    putLike(card)
      .then((json) => {
        likeBtn.classList.add(cardLikeBtnActiveClass);
        renderLikesNumber(likesNumberElement, json.likes.length);
      })
      .catch((err) => show(err));
  }
}

function openEnlargeImagePopup(event) {
  const imageLink = event.target.src;
  const placeName = event.target
    .closest(`.${cardElementClass}`)
    .querySelector(`.${cardNameClass}`).textContent;

  enlargeImage.src = imageLink;
  enlargeImage.alt = 'Увеличенное изображение места ' + placeName;
  figcaption.textContent = placeName;

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
  removePlace,
  toggleLike,
};
