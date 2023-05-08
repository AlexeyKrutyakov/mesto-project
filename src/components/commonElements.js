// CARDS SECTION
export const cardsSection = document.querySelector('.cards');
// POPUPS
// profile popup
export const profilePopupClass = 'popup_type_edit-profile';
export const profilePopup = document.querySelector(`.${profilePopupClass}`);
// place popup
export const placePopupClass = 'popup_type_add-place';
export const placePopup = document.querySelector(`.${placePopupClass}`);
// FORMS
// profile form
export const profileForm = document.forms['profile-info'];
// place form
export const placeForm = document.forms['place-info'];
// input 'profile name'
export const profileInputName = profileForm.elements['profile-name-input'];
// input 'profile text'
export const profileInputText = profileForm.elements['profile-text-input'];
// input 'place name'
export const placeInputName = placeForm.elements['place-name-input'];
// input 'place text'
export const placeInputImage = placeForm.elements['place-image-input'];
// popup 'submit' button
export const submitBtnClass = 'form__submit';
export const profileSubmitBnt = profileForm.querySelector(`.${submitBtnClass}`);
