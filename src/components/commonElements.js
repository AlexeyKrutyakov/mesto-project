// PROFILE SECTION
export const profileSection = document.querySelector('.profile');
export const profileName = profileSection.querySelector('.profile__name');
export const profileAbout = profileSection.querySelector('.profile__text');

// CARDS SECTION
export const cardsSection = document.querySelector('.cards');

// POPUPS
// avatar popup
export const avatarPopupClass = 'popup_type_edit-avatar';
export const avatarPopup = document.querySelector(`.${avatarPopupClass}`);
// profile popup
export const profilePopupClass = 'popup_type_edit-profile';
export const profilePopup = document.querySelector(`.${profilePopupClass}`);
// place popup
export const placePopupClass = 'popup_type_add-place';
export const placePopup = document.querySelector(`.${placePopupClass}`);

// FORMS
// avatar form
export const avatarForm = document.forms['edit-avatar'];
export const avatarImageInput = avatarForm.elements['avatar-image-input'];
// profile form
export const profileForm = document.forms['profile-info'];
// input 'profile name'
export const profileInputName = profileForm.elements['profile-name-input'];
// input 'profile text'
export const profileInputText = profileForm.elements['profile-text-input'];
// place form
export const placeForm = document.forms['place-info'];
// input 'place name'
export const placeInputName = placeForm.elements['place-name-input'];
// input 'place text'
export const placeInputImage = placeForm.elements['place-image-input'];

// POPUPS 'SUBMIT' BUTTONS
export const submitBtnClass = 'form__submit';
export const profileSubmitBnt = profileForm.querySelector(`.${submitBtnClass}`);
export const avatarSubmitBtn = avatarForm.querySelector(`.${submitBtnClass}`);
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
