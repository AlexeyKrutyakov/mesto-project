// page
const page = document.querySelector('.page');
// PROFILE SECTION
const profileSection = page.querySelector('.profile');
// profile name and profile text elements
const elementProfileName = page.querySelector('.profile__name');
const elementProfileText = page.querySelector('.profile__text');
// button for edit profile
const classBtnEditProfile = 'profile__edit-button';
const btnEditProfile = profileSection.querySelector(`.${classBtnEditProfile}`);
// 'add place' button
const classBtnAddPlace = 'profile__add-button';
const btnAddPlace = profileSection.querySelector(`.${classBtnAddPlace}`);
// CARDS SECTION
const cardsSection = page.querySelector('.cards');
// card template
const templateCard = page.querySelector('#card-template').content;
// card image class
const classCardImage = 'card__image';
// like button class
const classLikeBtn = 'card__like-button';
// define class for active 'like' button
const classActiveLikeBtn = 'card__like-button_active';
// remove card button class
const classRemoveCardBtn = 'card__remove-button';
// POPUPS
// class for opened popup
const classOpenedPopup = 'popup_opened';
// popup for edit profile
const classPopupEditProfile = 'popup_type_edit-profile';
const popupEditProfile = page.querySelector(`.${classPopupEditProfile}`);
// form for edit profile
const classFieldsetEditProfile = 'form__profile-info';
// button 'close edit-profile popup'
const classBtnClosePopup = 'popup__close-button';
const btnClosePopupEditProfile = popupEditProfile.querySelector(
  `.${classBtnClosePopup}`
);
// popup for add place
const classPopupAddPlace = 'popup_type_add-place';
const popupAddPlace = page.querySelector(`.${classPopupAddPlace}`);
// popup with 'enlarge image place'
const classPopupEnlargeImage = 'popup_type_enlarge-image';
const popupEnlargeImage = page.querySelector(`.${classPopupEnlargeImage}`);
// elements of enlarge image popup
const classPopupFigure = 'popup__figure';
const popupImage = popupEnlargeImage.querySelector('.popup__image');
const popupFigcaption = popupEnlargeImage.querySelector('.popup__figcaption');
// button close 'add place popup'
const btnClosePopupAddPlace = popupAddPlace.querySelector(
  `.${classBtnClosePopup}`
);
// button close 'enlarge image popup'
const btnClosePopupEnlargeImage = popupEnlargeImage.querySelector(
  `.${classBtnClosePopup}`
);

// FORMS
// form for edit profile
const formProfileInfo = document.forms['profile-info'];
// form for add place
const classFieldsetAddPlace = 'form__place-info';
const formPlaceInfo = document.forms['place-info'];
// 'profile name' input value
const inputProfileName = page.querySelector('#profile-name-input');
// 'profile text' input value
const inputProfileText = page.querySelector('#profile-text-input');
// define 'place name' input value
const inputPlaceName = formPlaceInfo.querySelector('#place-name-input');
// define 'place text' input value
const inputPlaceImage = formPlaceInfo.querySelector('#place-image-input');
// 'submit' button of the popup
const classPopupSubmitBtn = 'form__submit';

// FUNCTIONS
function openPopup(popup) {
  popup.classList.add(classOpenedPopup);
}

function closePopup(popup) {
  popup.classList.remove(classOpenedPopup);
}

function openPopupEditProfile() {
  openPopup(popupEditProfile);
  // initiate input values with current profile data
  inputProfileName.value = profile.name;
  inputProfileText.value = profile.text;
  // add listeners for popup buttons
  popupEditProfile.addEventListener('click', clickHandler);
  formProfileInfo.addEventListener('submit', submitFormEditProfile);
}

function openPopupAddPlace() {
  openPopup(popupAddPlace);
  const buttonElement = popupAddPlace.querySelector('.form__submit');
  // // clear old name and text in input fields -> form.reset()
  inputPlaceName.value = '';
  inputPlaceImage.value = '';
  // add listeners for popup buttons
  popupAddPlace.addEventListener('click', clickHandler);
  formPlaceInfo.addEventListener('submit', submitformPlaceInfo);
}

function openPopupEnlargeImage(event) {
  const imageLink = event.target.src;
  const placeName = event.target
    .closest('.card')
    .querySelector('.card__name').textContent;

  popupImage.src = imageLink;
  popupImage.alt = 'Увеличенное изображение места ' + placeName;
  popupFigcaption.textContent = placeName;
  popupEnlargeImage.addEventListener('click', clickHandler);
  openPopup(popupEnlargeImage);
}

function submitFormEditProfile(event) {
  // undo standard sumbit behavior
  event.preventDefault();

  const name = inputProfileName.value;
  const text = inputProfileText.value;
  // update profile
  saveNewProfile(name, text);
  refreshProfile();
  // removeFormEventListeners(formProfileInfo);
  closePopup(popupEditProfile);
}

function submitformPlaceInfo(event) {
  // undo standard sumbit behavior
  event.preventDefault();

  const placeName = inputPlaceName.value;
  const placeImage = inputPlaceImage.value;

  addPlaceCard(placeName, placeImage);
  formPlaceInfo.reset();
  closePopup(popupAddPlace);
}

function saveNewProfile(name, text) {
  profile['name'] = name;
  profile['text'] = text;
}

function refreshProfile() {
  elementProfileName.textContent = profile.name;
  elementProfileText.textContent = profile.text;
}

function toggleLike(event) {
  const btnLike = event.target;
  const btnClasses = btnLike.classList;
  btnClasses.toggle(classActiveLikeBtn);
}

function addPlaceCard(placeName, placeImage, imageAlt = '') {
  const newCard = createPlaceCard(placeName, placeImage, imageAlt);
  cardsSection.prepend(newCard);
}

function createPlaceCard(placeName, placeImage, imageAlt = '') {
  // copy of template element
  const placeCard = templateCard.querySelector('.card').cloneNode(true);
  // elements of card
  const cardName = placeCard.querySelector('.card__name');
  const cardImage = placeCard.querySelector('.card__image');
  const btnRemoveCard = placeCard.querySelector('.card__remove-button');
  const btnLikeCard = placeCard.querySelector('.card__like-button');
  // initialize data place into place card
  cardName.textContent = placeName;
  cardImage.src = placeImage;
  if (imageAlt === '') {
    cardImage.alt = 'Изображение места ' + placeName;
  } else {
    cardImage.alt = imageAlt;
  }

  return placeCard;
}

function removeCard(event) {
  const currentCard = event.target.closest('.card');
  currentCard.remove();
}

function clickHandler(event) {
  const targetClassList = event.target.classList;
  if (targetClassList.contains(classBtnEditProfile)) {
    openPopupEditProfile();
  }
  if (targetClassList.contains(classBtnAddPlace)) {
    openPopupAddPlace();
  }
  if (targetClassList.contains(classCardImage)) {
    openPopupEnlargeImage(event);
  }
  if (targetClassList.contains(classLikeBtn)) {
    toggleLike(event);
  }
  if (targetClassList.contains(classRemoveCardBtn)) {
    removeCard(event);
  }
  if (targetClassList.contains(classBtnClosePopup)) {
    const popup = event.target.closest('.popup');
    popup.removeEventListener('click', clickHandler);
    closePopup(popup);
  }
  if (targetClassList.contains(classPopupSubmitBtn)) {
    const form = event.target.closest('.form');
    switch (form.name) {
      case 'profile-info':
        popupEditProfile.removeEventListener('click', clickHandler);
        formProfileInfo.removeEventListener('submit', submitFormEditProfile);
        submitFormEditProfile(event);
        break;
      case 'place-info':
        popupAddPlace.removeEventListener('click', clickHandler);
        formPlaceInfo.removeEventListener('submit', submitformPlaceInfo);
        submitformPlaceInfo(event);
        break;
    }
  }
  if (
    targetClassList.contains('popup') &&
    !targetClassList.contains('popup__container')
  ) {
    const popup = event.target.closest('.popup');
    closePopup(popup);
  }
}

function keydownHandler(event) {
  if (event.keyCode === 27) {
    const popupOpened = page.querySelector('.popup_opened');
    if (popupOpened) closePopup(popupOpened);
  }
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_invalid');
  errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_invalid');
  errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function setFormEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__submit');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

// function removeFormEventListeners(formElement) {
//   const inputList = Array.from(formElement.querySelectorAll('.form__input'));
//   const buttonElement = formElement.querySelector('.form__submit');
//   inputList.forEach((inputElement) => {
//     inputElement.removeEventListener('input', () => {
//       checkInputValidity(formElement, inputElement);
//       toggleButtonState(inputList, buttonElement);
//     });
//   });
// }

function enableFormValidation(formElement) {
  const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
  fieldsetList.forEach((fieldset) => {
    setFormEventListeners(fieldset);
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__submit_inactive');
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('form__submit_inactive');
    buttonElement.disabled = false;
  }
}

// initialize place cards
initialCards.forEach((place) => {
  addPlaceCard(place.name, place.link, place.alt);
});

// add listeners
profileSection.addEventListener('click', clickHandler);
cardsSection.addEventListener('click', clickHandler);
page.addEventListener('keydown', keydownHandler);

// enable forms validation
enableFormValidation(formProfileInfo);
enableFormValidation(formPlaceInfo);

// btnClosePopupEnlargeImage.addEventListener('click', () =>
//   closePopup(popupEnlargeImage)
// );

// to-do:
