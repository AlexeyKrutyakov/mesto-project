// CARDS SECTION
export const cardsSection = document.querySelector('.cards');
// POPUPS
// popup for edit profile
export const profilePopupClass = 'popup_type_edit-profile';
export const profilePopup = document.querySelector(`.${profilePopupClass}`);
// popup for add place
export const placePopupClass = 'popup_type_add-place';
export const placePopup = document.querySelector(`.${placePopupClass}`);
// FORMS
// form for edit profile
export const profileForm = document.forms['profile-info'];
// form for add place
export const placeForm = document.forms['place-info'];
// class for input elements
export const classFormInput = 'form__input';
// 'profile name' input value
export const profileInputName = profileForm.elements['profile-name-input'];
// 'profile text' input value
export const profileInputText = profileForm.elements['profile-text-input'];
// define 'place name' input value
export const placeInputName = placeForm.elements['place-name-input'];
// define 'place text' input value
export const placeInputImage = placeForm.elements['place-image-input'];
// 'submit' button of the popup
export const classPopupSubmitBtn = 'form__submit';
export const profileSubmitBnt = profileForm.querySelector(
  `.${classPopupSubmitBtn}`
);
