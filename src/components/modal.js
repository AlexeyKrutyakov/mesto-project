import {
  avatarPopup,
  avatarForm,
  avatarImageInput,
  profilePopup,
  profileForm,
  profileNameInput,
  profileTextInput,
  placePopup,
  placeForm,
  placeNameInput,
  placeImageInput,
  validationParameters,
} from './commonElements.js';
import { validateInput, toggleButtonState } from './validate.js';
import { clickHandler } from './utils.js';
import { config, postCard, patchProfile, patchAvatar } from './api.js';

// popup
const openedPopupClass = 'popup_opened';
// enlarge image elements
const enlargeImagePopupClass = 'popup_type_enlarge-image';
const enlargeImagePopup = document.querySelector(`.${enlargeImagePopupClass}`);
const enlargeImage = enlargeImagePopup.querySelector('.popup__image');
const figcaption = enlargeImagePopup.querySelector('.popup__figcaption');
// card elements
const cardElementClass = 'card';
const cardNameClass = 'card__name';

function openPopup(popup) {
  popup.classList.add(openedPopupClass);
  document.addEventListener('keydown', keydownHandler);
}

function closePopup(popup) {
  document.removeEventListener('keydown', keydownHandler);
  popup.classList.remove(openedPopupClass);
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

function submitProfileForm(event) {
  // undo standard sumbit behavior
  event.preventDefault();

  // update profile
  patchProfile(profileNameInput.value, profileTextInput.value, config);
  document.removeEventListener('keydown', keydownHandler);
  closePopup(profilePopup);
}

function submitAvatarForm(event) {
  // undo standard sumbit behavior
  event.preventDefault();

  patchAvatar(avatarImageInput.value, config);
  avatarForm.reset();

  closePopup(avatarPopup);
}

function submitPlaceForm(event) {
  // undo standard sumbit behavior
  event.preventDefault();

  postCard(placeNameInput.value, placeImageInput.value, config);
  placeForm.reset();

  closePopup(placePopup);
}

function keydownHandler(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

export {
  openPopup,
  closePopup,
  openPlacePopup,
  openEnlargeImagePopup,
  submitProfileForm,
  submitPlaceForm,
  submitAvatarForm,
  keydownHandler,
};
