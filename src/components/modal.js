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
import { keydownHandler } from './utils.js';
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

export { openPopup, closePopup };
