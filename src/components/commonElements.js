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
export const profileName = profileSection.querySelector('.profile__name');
export const profileAbout = profileSection.querySelector('.profile__text');
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
const cardElementClass = 'card';
const cardNameClass = 'card__name';

// place popup
const placePopupClass = 'popup_type_add-place';
export const placePopup = document.querySelector(`.${placePopupClass}`);
// place form
export const placeForm = document.forms['place-info'];
// input 'place name'
const placeNameInput = placeForm.elements['place-name-input'];
// input 'place text'
const placeImageInput = placeForm.elements['place-image-input'];
export const placeSubmitBtn = placeForm.querySelector(`.${submitBtnClass}`);

// enlarge image popup elements
const enlargeImagePopupClass = 'popup_type_enlarge-image';
export const enlargeImagePopup = document.querySelector(
  `.${enlargeImagePopupClass}`
);
const enlargeImage = enlargeImagePopup.querySelector('.popup__image');
const figcaption = enlargeImagePopup.querySelector('.popup__figcaption');

// parameters for validation
export const validationParameters = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveBtnClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_invalid',
};

// status for submit buttons
export const submitStatus = {
  save: 'Сохранить',
  saving: 'Сохранение...',
};
