import {
  avatarPopup,
  avatarForm,
  avatarImageInput,
  profileName,
  profileAbout,
  profilePopup,
  profileForm,
  profileInputName,
  profileInputText,
  placePopup,
  placeForm,
  placeInputName,
  placeInputImage,
  validationParameters,
} from './commonElements.js';
import { validateInput, toggleButtonState } from './validate.js';
import { clickHandler, keydownHandler } from './utils.js';
import { config, postCard, updateProfile, patchAvatar } from './api.js';

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

function openProfilePopup() {
  openPopup(profilePopup);

  // initiate input values with current profile data
  profileInputName.value = profileName.textContent;
  profileInputText.value = profileAbout.textContent;

  // validate input values
  validateInput(profileForm, profileInputName, validationParameters);
  validateInput(profileForm, profileInputText, validationParameters);
  toggleButtonState(
    profileForm,
    [profileInputName, profileInputText],
    validationParameters
  );

  // add listeners
  profilePopup.addEventListener('click', clickHandler);
  profileForm.addEventListener('submit', submitProfileForm);
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
  validateInput(placeForm, placeInputName, validationParameters);
  validateInput(placeForm, placeInputImage, validationParameters);
  toggleButtonState(
    placeForm,
    [placeInputName, placeInputImage],
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
  updateProfile(profileInputName.value, profileInputText.value, config);
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

  postCard(placeInputName.value, placeInputImage.value, config);
  placeForm.reset();

  closePopup(placePopup);
}

export {
  openPopup,
  closePopup,
  openAvatarPopup,
  openProfilePopup,
  openPlacePopup,
  openEnlargeImagePopup,
  submitProfileForm,
  submitPlaceForm,
  submitAvatarForm,
};
