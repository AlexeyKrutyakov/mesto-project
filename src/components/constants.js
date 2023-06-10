// data for server authorization
export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-24',
  headers: {
    authorization: '9e2d263a-3d5a-40f2-a16e-27e8711676de',
    'Content-Type': 'application/json',
  },
};

// cards
export const gallerySelectors = {
  cardsContainer: '.cards',
}

// card selectors
export const cardSelectors = {
  cardSelector: '.card',
  nameSelector: '.cardname',
  imageSelector: '.cardimage',
  likeBtnSelector: '.cardlike-button',
  likeBtnActiveClass: 'cardlike-button_active',
  likeNumSelector: '.cardlikes-number',
  removeBtnSelector: '.cardremove-button',
};

// parameters for validation
export const formSelectors = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitBtnClass: 'form__submit',
  submitBtnSelector: '.form__submit',
  inactiveBtnClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_invalid',
};

// status for submit buttons
export const submitStatus = {
  save: 'Сохранить',
  saving: 'Сохранение...',
  create: 'Создать',
  creating: 'Создание...',
};




// OLD CONSTANTS

// common elements
export const popupClass = 'popup';
export const openedPopupClass = 'popup_opened';

// submit button class
export const submitBtnClass = 'form__submit';

// profile DOM elements
const profileSection = document.querySelector('.profile');
// avatar
const avatarImageClass = 'profile__avatar-image';
export const avatarImage = document.querySelector(`.${avatarImageClass}`);
const editAvararBtnClass = 'profile__edit-avatar-button';
export const editAvatarBtn = document.querySelector(`.${editAvararBtnClass}`);
// avatar popup
const avatarPopupClass = 'popup_type_edit-avatar';
export const avatarPopup = document.querySelector(`.${avatarPopupClass}`);
// avatar form
export const avatarForm = document.forms['edit-avatar'];
export const avatarImageInput = avatarForm.elements['avatar-image-input'];
export const avatarSubmitBtn = avatarForm.querySelector(`.${submitBtnClass}`);
// profile info
const editProfileBtnClass = 'profile__edit-button';
export const editProfileBtn = profileSection.querySelector(
  `.${editProfileBtnClass}`
);
export const profileName = profileSection.querySelector('.profile__name');
export const profileAbout = profileSection.querySelector('.profile__text');
const addPlaceBtnClass = 'profile__add-button';
export const addPlaceBtn = profileSection.querySelector(`.${addPlaceBtnClass}`);
// profile popup
const profilePopupClass = 'popup_type_edit-profile';
export const profilePopup = document.querySelector(`.${profilePopupClass}`);
// profile form
export const profileForm = document.forms['profile-info'];
// input 'profile name'
export const profileNameInput = profileForm.elements['profile-name-input'];
// input 'profile text'
export const profileTextInput = profileForm.elements['profile-text-input'];
//profile submit button
export const profileSubmitBnt = profileForm.querySelector(`.${submitBtnClass}`);

// cards DOM elements
export const cardsSection = document.querySelector('.cards');
// card elements
export const cardElementClass = 'card';
export const cardNameClass = 'card__name';
export const cardLikeBtnActiveClass = 'card__like-button_active';

// place popup
const placePopupClass = 'popup_type_add-place';
export const placePopup = document.querySelector(`.${placePopupClass}`);
// place form
export const placeForm = document.forms['place-info'];
// input 'place name'
export const placeNameInput = placeForm.elements['place-name-input'];
// input 'place text'
export const placeImageInput = placeForm.elements['place-image-input'];
export const placeSubmitBtn = placeForm.querySelector(`.${submitBtnClass}`);

// enlarge image popup elements
const enlargeImagePopupClass = 'popup_type_enlarge-image';
export const enlargeImagePopup = document.querySelector(
  `.${enlargeImagePopupClass}`
);
export const enlargeImage = enlargeImagePopup.querySelector('.popup__image');
export const figcaption = enlargeImagePopup.querySelector('.popup__figcaption');


