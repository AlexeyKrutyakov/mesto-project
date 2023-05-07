import * as elements from './elements.js';
import { profile } from './data.js';
import { hasInvalidInput, validateInput } from './validate.js';
import { clickHandler, saveNewProfile, refreshProfile } from './utils.js';
import { addPlaceCard } from './card.js';

function openPopup(popup) {
  popup.classList.add(elements.classOpenedPopup);
}

function closePopup(popup) {
  popup.classList.remove(elements.classOpenedPopup);
}

function openPopupEditProfile() {
  openPopup(elements.popupEditProfile);
  // initiate input values with current profile data
  elements.inputProfileName.value = profile.name;
  elements.inputProfileText.value = profile.text;
  // validate input values
  validateInput(elements.formProfileInfo, elements.inputProfileName);
  validateInput(elements.formProfileInfo, elements.inputProfileText);
  toggleButtonState(
    [elements.inputProfileName, elements.inputProfileText],
    elements.submitFormEditProfile
  );
  elements.popupEditProfile.addEventListener('click', clickHandler);
  elements.formProfileInfo.addEventListener('submit', submitFormEditProfile);
}

function openPopupAddPlace() {
  openPopup(elements.popupAddPlace);
  // clear old name and text in input fields -> form.reset()
  elements.inputPlaceName.value = '';
  elements.inputPlaceImage.value = '';
  // validate inputs
  validateInput(elements.formPlaceInfo, elements.inputPlaceName);
  validateInput(elements.formPlaceInfo, elements.inputPlaceImage);
  // add listeners for popup buttons
  elements.popupAddPlace.addEventListener('click', clickHandler);
  elements.formPlaceInfo.addEventListener('submit', submitformPlaceInfo);
}

function openPopupEnlargeImage(event) {
  const imageLink = event.target.src;
  const placeName = event.target
    .closest(`.${elements.cardElementClass}`)
    .querySelector(`.${elements.cardNameClass}`).textContent;

  elements.popupImage.src = imageLink;
  elements.popupImage.alt = 'Увеличенное изображение места ' + placeName;
  elements.popupFigcaption.textContent = placeName;
  elements.popupEnlargeImage.addEventListener('click', clickHandler);
  openPopup(elements.popupEnlargeImage);
}

function submitFormEditProfile(event) {
  // undo standard sumbit behavior
  event.preventDefault();

  const name = elements.inputProfileName.value;
  const text = elements.inputProfileText.value;
  // update profile
  saveNewProfile(name, text);
  refreshProfile();

  closePopup(elements.popupEditProfile);
}

function submitformPlaceInfo(event) {
  // undo standard sumbit behavior
  event.preventDefault();

  const placeName = elements.inputPlaceName.value;
  const placeImage = elements.inputPlaceImage.value;

  addPlaceCard(placeName, placeImage);
  elements.formPlaceInfo.reset();

  closePopup(elements.popupAddPlace);
}

function setFormEventListeners(formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(`.${elements.classFormInput}`)
  );
  const buttonElement = formElement.querySelector(
    `.${elements.classPopupSubmitBtn}`
  );
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      validateInput(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(elements.classSubmitBtnInactive);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(elements.classSubmitBtnInactive);
    buttonElement.disabled = false;
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
