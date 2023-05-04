// page
export const page = document.querySelector('.page');
// PROFILE SECTION
export const profileSection = page.querySelector('.profile');
// profile name and profile text elements
export const elementProfileName = page.querySelector('.profile__name');
export const elementProfileText = page.querySelector('.profile__text');
// button for edit profile
export const classBtnEditProfile = 'profile__edit-button';
export const btnEditProfile = profileSection.querySelector(
  `.${classBtnEditProfile}`
);
// 'add place' button
export const classBtnAddPlace = 'profile__add-button';
export const btnAddPlace = profileSection.querySelector(`.${classBtnAddPlace}`);
// CARDS SECTION
export const cardsSection = page.querySelector('.cards');
// card template
export const templateCard = page.querySelector('#card-template').content;
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
export const classPopupEditProfile = 'popup_type_edit-profile';
export const popupEditProfile = page.querySelector(`.${classPopupEditProfile}`);
// form for edit profile
export const classFieldsetEditProfile = 'form__profile-info';
// button 'close edit-profile popup'
export const classBtnClosePopup = 'popup__close-button';
export const btnClosePopupEditProfile = popupEditProfile.querySelector(
  `.${classBtnClosePopup}`
);
// popup for add place
export const classPopupAddPlace = 'popup_type_add-place';
export const popupAddPlace = page.querySelector(`.${classPopupAddPlace}`);
// popup with 'enlarge image place'
export const classPopupEnlargeImage = 'popup_type_enlarge-image';
export const popupEnlargeImage = page.querySelector(
  `.${classPopupEnlargeImage}`
);
// elements of enlarge image popup
export const classPopupFigure = 'popup__figure';
export const popupImage = popupEnlargeImage.querySelector('.popup__image');
export const popupFigcaption =
  popupEnlargeImage.querySelector('.popup__figcaption');
// button close 'add place popup'
export const btnClosePopupAddPlace = popupAddPlace.querySelector(
  `.${classBtnClosePopup}`
);
// button close 'enlarge image popup'
export const btnClosePopupEnlargeImage = popupEnlargeImage.querySelector(
  `.${classBtnClosePopup}`
);

// FORMS
// form for edit profile
export const formProfileInfo = document.forms['profile-info'];
// form for add place
export const classFieldsetAddPlace = 'form__place-info';
export const formPlaceInfo = document.forms['place-info'];
// 'profile name' input value
export const inputProfileName = page.querySelector('#profile-name-input');
// 'profile text' input value
export const inputProfileText = page.querySelector('#profile-text-input');
// define 'place name' input value
export const inputPlaceName = formPlaceInfo.querySelector('#place-name-input');
// define 'place text' input value
export const inputPlaceImage =
  formPlaceInfo.querySelector('#place-image-input');
// 'submit' button of the popup
export const classPopupSubmitBtn = 'form__submit';
