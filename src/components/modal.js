import {
  profilePopup,
  profileForm,
  profileInputName,
  profileInputText,
  profileSubmitBnt,
  placePopup,
  placeForm,
  placeInputName,
  placeInputImage,
  classPopupSubmitBtn,
} from './commonElements.js';
import { profile } from './data.js';
import { hasInvalidInput, validateInput } from './validate.js';
import { clickHandler, saveNewProfile, refreshProfile } from './utils.js';
import { addPlaceCard } from './card.js';

// popup
const classOpenedPopup = 'popup_opened';
//form
const classFormInput = 'form__input';
const classSubmitBtnInactive = 'form__submit_inactive';
// enlarge image elements
const enlargeImagePopupClass = 'popup_type_enlarge-image';
const enlargeImagePopup = document.querySelector(`.${enlargeImagePopupClass}`);
const enlargeImage = enlargeImagePopup.querySelector('.popup__image');
const figcaption = enlargeImagePopup.querySelector('.popup__figcaption');
// card elements
const cardElementClass = 'card';
const cardNameClass = 'card__name';

function openPopup(popup) {
  popup.classList.add(classOpenedPopup);
}

function closePopup(popup) {
  popup.classList.remove(classOpenedPopup);
}

function openPopupEditProfile() {
  openPopup(profilePopup);

  // initiate input values with current profile data
  profileInputName.value = profile.name;
  profileInputText.value = profile.text;

  // validate input values
  validateInput(profileForm, profileInputName);
  validateInput(profileForm, profileInputText);

  // toggle submit button
  toggleButtonState([profileInputName, profileInputText], profileSubmitBnt);

  // add listeners
  profilePopup.addEventListener('click', clickHandler);
  profileForm.addEventListener('submit', submitFormEditProfile);
}

function openPopupAddPlace() {
  openPopup(placePopup);

  // clear old name and text in input fields -> form.reset()
  placeInputName.value = '';
  placeInputImage.value = '';

  // validate inputs
  validateInput(placeForm, placeInputName);
  validateInput(placeForm, placeInputImage);

  // add listeners for popup buttons
  placePopup.addEventListener('click', clickHandler);
  placeForm.addEventListener('submit', submitformPlaceInfo);
}

function openPopupEnlargeImage(event) {
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

function submitFormEditProfile(event) {
  // undo standard sumbit behavior
  event.preventDefault();

  // update profile
  saveNewProfile(profileInputName.value, profileInputText.value);
  refreshProfile();

  closePopup(profilePopup);
}

function submitformPlaceInfo(event) {
  // undo standard sumbit behavior
  event.preventDefault();

  addPlaceCard(placeInputName.value, placeInputImage.value);
  placeForm.reset();

  closePopup(placePopup);
}

function setFormEventListeners(form) {
  const inputs = Array.from(form.querySelectorAll(`.${classFormInput}`));
  const btn = form.querySelector(`.${classPopupSubmitBtn}`);

  toggleButtonState(inputs, btn);

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      validateInput(form, input);
      toggleButtonState(inputs, btn);
    });
  });
}

function toggleButtonState(inputList, btn) {
  const submitBtnInactiveClass = classSubmitBtnInactive;

  if (hasInvalidInput(inputList)) {
    btn.classList.add(submitBtnInactiveClass);
    btn.disabled = true;
  } else {
    btn.classList.remove(submitBtnInactiveClass);
    btn.disabled = false;
  }
}

export {
  openPopup,
  closePopup,
  openPopupEditProfile,
  openPopupAddPlace,
  openPopupEnlargeImage,
  submitFormEditProfile,
  submitformPlaceInfo,
  setFormEventListeners,
  toggleButtonState,
};
