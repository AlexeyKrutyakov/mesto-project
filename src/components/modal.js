import {
  profilePopup,
  profileForm,
  profileInputName,
  profileInputText,
  placePopup,
  placeForm,
  placeInputName,
  placeInputImage,
} from './commonElements.js';
import { profile } from './data.js';
import { hasInvalidInput, validateInput } from './validate.js';
import {
  clickHandler,
  saveNewProfile,
  refreshProfile,
  keydownHandler,
} from './utils.js';
import { addPlaceCard } from './card.js';

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
  profileInputName.value = profile.name;
  profileInputText.value = profile.text;

  // validate input values
  validateInput(profileForm, profileInputName);
  validateInput(profileForm, profileInputText);

  // add listeners
  profilePopup.addEventListener('click', clickHandler);
  profileForm.addEventListener('submit', submitProfileForm);
}

function openPlacePopup() {
  openPopup(placePopup);

  // clear old name and text in input fields
  placeForm.reset();

  // validate inputs
  validateInput(placeForm, placeInputName);
  validateInput(placeForm, placeInputImage);

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
  saveNewProfile(profileInputName.value, profileInputText.value);
  refreshProfile();
  document.removeEventListener('keydown', keydownHandler);
  closePopup(profilePopup);
}

function submitPlaceForm(event) {
  // undo standard sumbit behavior
  event.preventDefault();

  addPlaceCard(placeInputName.value, placeInputImage.value);
  placeForm.reset();

  closePopup(placePopup);
}

export {
  openPopup,
  closePopup,
  openProfilePopup,
  openPlacePopup,
  openEnlargeImagePopup,
  submitProfileForm,
  submitPlaceForm,
};
