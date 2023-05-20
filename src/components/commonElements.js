// common elements
// submit button class
export const submitBtnClass = 'form__submit';

// profile DOM elements
export const profileSection = document.querySelector('.profile');
// avatar popup
export const avatarPopupClass = 'popup_type_edit-avatar';
export const avatarPopup = document.querySelector(`.${avatarPopupClass}`);
// avatar form
export const avatarForm = document.forms['edit-avatar'];
export const avatarImageInput = avatarForm.elements['avatar-image-input'];
export const avatarSubmitBtn = avatarForm.querySelector(`.${submitBtnClass}`);
// profile info
export const profileName = profileSection.querySelector('.profile__name');
export const profileAbout = profileSection.querySelector('.profile__text');
// profile popup
export const profilePopupClass = 'popup_type_edit-profile';
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

// place popup
export const placePopupClass = 'popup_type_add-place';
export const placePopup = document.querySelector(`.${placePopupClass}`);
// place form
export const placeForm = document.forms['place-info'];
// input 'place name'
export const placeNameInput = placeForm.elements['place-name-input'];
// input 'place text'
export const placeImageInput = placeForm.elements['place-image-input'];
export const placeSubmitBtn = placeForm.querySelector(`.${submitBtnClass}`);

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
