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
// button 'close edit-profile popup'
const classBtnClosePopupEditProfile = 'popup__close-button';
const btnClosePopupEditProfile = popupEditProfile.querySelector(
  `.${classBtnClosePopupEditProfile}`
);
// popup for add place
const classPopupAddPlace = 'popup_type_add-place';
const popupAddPlace = page.querySelector(`.${classPopupAddPlace}`);
// popup with 'enlarge image place'
const popupEnlargeImage = page.querySelector('.popup_type_enlarge-image');
// elements of enlarge image popup
const popupImage = popupEnlargeImage.querySelector('.popup__image');
const popupFigcaption = popupEnlargeImage.querySelector('.popup__figcaption');
// button close 'add place popup'
const classBtnClosePopupAddPlace = 'popup__close-button';
const btnClosePopupAddPlace = popupAddPlace.querySelector(
  `.${classBtnClosePopupAddPlace}`
);
// button close 'enlarge image popup'
const btnClosePopupEnlargeImage = popupEnlargeImage.querySelector(
  '.popup__close-button'
);

// FORMS
// form for edit profile
const formEditProfile = popupEditProfile.querySelector('.form');
// form for add place
const formAddPlace = popupAddPlace.querySelector('.form');
// 'profile name' input value
const inputProfileName = page.querySelector('.form__input[name=profile-name]');
// 'profile text' input value
const inputProfileText = page.querySelector('.form__input[name=profile-text]');
// define 'place name' input value
const inputPlaceName = formAddPlace.querySelector(
  '.form__input[name=place-name]'
);
// define 'place text' input value
const inputPlaceImage = formAddPlace.querySelector(
  '.form__input[name=place-image]'
);
// 'submit' button of the popup
const classPopupSubmitBtn = 'form__save-button';

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
  formEditProfile.addEventListener('submit', submitFormEditProfile);
}

function openPopupAddPlace() {
  openPopup(popupAddPlace);

  // clear old name and text in input fields
  inputPlaceName.value = '';
  inputPlaceImage.value = '';
  // add listeners for popup buttons
  popupAddPlace.addEventListener('click', clickHandler);
  formAddPlace.addEventListener('submit', submitFormAddPlace);
}

function openPopupEnlargeImage(event) {
  const imageLink = event.target.src;
  const placeName = event.target
    .closest('.card')
    .querySelector('.card__name').textContent;

  popupImage.src = imageLink;
  popupImage.alt = 'Увеличенное изображение места ' + placeName;
  popupFigcaption.textContent = placeName;

  openPopup(popupEnlargeImage);
}

function submitFormEditProfile(event, form) {
  // undo standard sumbit behavior
  event.preventDefault();

  const name = inputProfileName.value;
  const text = inputProfileText.value;
  // update profile
  saveNewProfile(name, text);
  refreshProfile();

  closePopup(popupEditProfile);
}

function submitFormAddPlace(event) {
  // undo standard sumbit behavior
  event.preventDefault();

  const placeName = inputPlaceName.value;
  const placeImage = inputPlaceImage.value;

  addPlaceCard(placeName, placeImage);

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
  if (event.target.classList.contains(classBtnEditProfile)) {
    openPopupEditProfile();
  }
  if (event.target.classList.contains(classBtnAddPlace)) {
    openPopupAddPlace();
  }
  if (event.target.classList.contains(classCardImage)) {
    openPopupEnlargeImage(event);
  }
  if (event.target.classList.contains(classLikeBtn)) {
    toggleLike(event);
  }
  if (event.target.classList.contains(classRemoveCardBtn)) {
    removeCard(event);
  }
  if (event.target.classList.contains(classBtnClosePopupEditProfile)) {
    popupEditProfile.removeEventListener('click', clickHandler);
    closePopup(popupEditProfile);
  }
  if (event.target.classList.contains(classBtnClosePopupAddPlace)) {
    popupAddPlace.removeEventListener('click', clickHandler);
    closePopup(popupAddPlace);
  }
  if (event.target.classList.contains(classPopupSubmitBtn)) {
    const form = event.target.closest('.form');
    switch (form.name) {
      case 'profile-info':
        popupEditProfile.removeEventListener('click', clickHandler);
        formEditProfile.removeEventListener('submit', submitFormEditProfile);
        break;
      case 'place-info':
        popupAddPlace.removeEventListener('click', clickHandler);
        formAddPlace.removeEventListener('submit', submitFormAddPlace);
        break;
    }
  }
}

// initialize place cards
initialCards.forEach((place) => {
  addPlaceCard(place.name, place.link, place.alt);
});

// add listeners for popups buttons
profileSection.addEventListener('click', clickHandler);
cardsSection.addEventListener('click', clickHandler);

btnClosePopupEnlargeImage.addEventListener('click', () =>
  closePopup(popupEnlargeImage)
);
