import {
  classPopupSubmitBtn,
  profilePopup,
  profileForm,
  placePopup,
  placeForm,
} from './commonElements.js';
import { profile } from './data.js';
import {
  openPopupEditProfile,
  submitFormEditProfile,
  openPopupAddPlace,
  submitformPlaceInfo,
  openPopupEnlargeImage,
  closePopup,
} from './modal.js';
import { removeCard, toggleLike } from './card.js';

const elementProfileName = document.querySelector('.profile__name');
const elementProfileText = document.querySelector('.profile__text');
const classBtnEditProfile = 'profile__edit-button';
const classBtnAddPlace = 'profile__add-button';
const classCardImage = 'card__image';
const classLikeBtn = 'card__like-button';
const classRemoveCardBtn = 'card__remove-button';
const classBtnClosePopup = 'popup__close-button';

function saveNewProfile(name, text) {
  profile['name'] = name;
  profile['text'] = text;
}

function refreshProfile() {
  elementProfileName.textContent = profile.name;
  elementProfileText.textContent = profile.text;
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
        profilePopup.removeEventListener('click', clickHandler);
        profileForm.removeEventListener('submit', submitFormEditProfile);
        submitFormEditProfile(event);
        break;
      case 'place-info':
        placePopup.removeEventListener('click', clickHandler);
        placeForm.removeEventListener('submit', submitformPlaceInfo);
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
    const popupOpened = document.querySelector('.popup_opened');
    if (popupOpened) closePopup(popupOpened);
  }
}

export { saveNewProfile, refreshProfile, clickHandler, keydownHandler };
