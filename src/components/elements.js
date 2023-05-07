// page
export const page = document.querySelector('.page'); // **
// PROFILE SECTION
export const profileSection = page.querySelector('.profile');
// profile name and profile text elements
export const elementProfileName = page.querySelector('.profile__name');
export const elementProfileText = page.querySelector('.profile__text');
// button for edit profile
export const classBtnEditProfile = 'profile__edit-button';
// 'add place' button
export const classBtnAddPlace = 'profile__add-button';
// CARDS SECTION
export const cardsSection = page.querySelector('.cards'); // **
// card template
export const templateCard = page.querySelector('#card-template').content;
// card element class
export const cardElementClass = 'card';
// card name class
export const cardNameClass = 'card__name';
// card image class
export const classCardImage = 'card__image';
// like button class
export const classLikeBtn = 'card__like-button';
// define class for active 'like' button
export const classActiveLikeBtn = 'card__like-button_active';
// remove card button class
export const classRemoveCardBtn = 'card__remove-button';
// POPUPS
// class for opened popup
export const classOpenedPopup = 'popup_opened';
// popup for edit profile
export const profilePopupClass = 'popup_type_edit-profile';
export const profilePopup = page.querySelector(`.${profilePopupClass}`); // **
// button 'close edit-profile popup'
export const classBtnClosePopup = 'popup__close-button';
// popup for add place
export const placePopupClass = 'popup_type_add-place';
export const placePopup = page.querySelector(`.${placePopupClass}`); // **
// popup with 'enlarge image place'
export const enlargeImagePopupClass = 'popup_type_enlarge-image';
export const enlargeImagePopup = page.querySelector(
  `.${enlargeImagePopupClass}`
);
// elements of enlarge image popup
export const enlargeImage = enlargeImagePopup.querySelector('.popup__image');
export const figcaption = enlargeImagePopup.querySelector('.popup__figcaption');

// FORMS
// form for edit profile
export const profileForm = document.forms['profile-info']; // ***
// form for add place
export const placeForm = document.forms['place-info']; // ***
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
export const classPopupSubmitBtn = 'form__submit'; // **
export const classSubmitBtnInactive = 'form__submit_inactive';
export const profileSubmitBnt = profileForm.querySelector(
  `.${classPopupSubmitBtn}`
);
