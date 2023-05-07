import * as elements from './elements.js';
import { profile } from './data.js';
import { hasInvalidInput, validateInput } from './validate.js';
import { clickHandler, saveNewProfile, refreshProfile } from './utils.js';
import { addPlaceCard } from './card.js';

// profile elements
const profilePopup = elements.profilePopup;
const profileForm = elements.profileForm;
const profileInputName = elements.profileInputName;
const profileInputText = elements.profileInputText;
const profileSubmitBnt = elements.profileSubmitBnt;
// place elements
const placePopup = elements.placePopup;
const placeForm = elements.placeForm;
const placeInputName = elements.placeInputName;
const placeInputImage = elements.placeInputImage;
// enlarge image elements
const enlargeImagePopup = elements.enlargeImagePopup;
const enlargeImage = elements.enlargeImage;
const figcaption = elements.figcaption;

function openPopup(popup) {
  popup.classList.add(elements.classOpenedPopup);
}

function closePopup(popup) {
  popup.classList.remove(elements.classOpenedPopup);
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
    .closest(`.${elements.cardElementClass}`)
    .querySelector(`.${elements.cardNameClass}`).textContent;

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
  saveNewProfile(profileInputName, profileInputText);
  refreshProfile();

  closePopup(profilePopup);
}

function submitformPlaceInfo(event) {
  // undo standard sumbit behavior
  event.preventDefault();

  addPlaceCard(placeInputName, placeInputImage);
  placeForm.reset();

  closePopup(placePopup);
}

function setFormEventListeners(form) {
  const inputs = Array.from(
    form.querySelectorAll(`.${elements.classFormInput}`)
  );
  const btn = form.querySelector(`.${elements.classPopupSubmitBtn}`);

  toggleButtonState(inputs, btn);

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      validateInput(form, input);
      toggleButtonState(inputs, btn);
    });
  });
}

function toggleButtonState(inputList, btn) {
  const submitBtnInactiveClass = elements.classSubmitBtnInactive;

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
