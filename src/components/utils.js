import * as elements from './elements.js';
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

function saveNewProfile(name, text) {
  profile['name'] = name;
  profile['text'] = text;
}

function refreshProfile() {
  elements.elementProfileName.textContent = profile.name;
  elements.elementProfileText.textContent = profile.text;
}

function clickHandler(event) {
  const targetClassList = event.target.classList;
  if (targetClassList.contains(elements.classBtnEditProfile)) {
    openPopupEditProfile();
  }
  if (targetClassList.contains(elements.classBtnAddPlace)) {
    openPopupAddPlace();
  }
  if (targetClassList.contains(elements.classCardImage)) {
    openPopupEnlargeImage(event);
  }
  if (targetClassList.contains(elements.classLikeBtn)) {
    toggleLike(event);
  }
  if (targetClassList.contains(elements.classRemoveCardBtn)) {
    removeCard(event);
  }
  if (targetClassList.contains(elements.classBtnClosePopup)) {
    const popup = event.target.closest('.popup');
    popup.removeEventListener('click', clickHandler);
    closePopup(popup);
  }
  if (targetClassList.contains(elements.classPopupSubmitBtn)) {
    const form = event.target.closest('.form');
    switch (form.name) {
      case 'profile-info':
        elements.popupEditProfile.removeEventListener('click', clickHandler);
        elements.formProfileInfo.removeEventListener(
          'submit',
          elements.submitFormEditProfile
        );
        submitFormEditProfile(event);
        break;
      case 'place-info':
        elements.popupAddPlace.removeEventListener('click', clickHandler);
        elements.formPlaceInfo.removeEventListener(
          'submit',
          elements.submitformPlaceInfo
        );
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
    const popupOpened = elements.page.querySelector('.popup_opened');
    if (popupOpened) closePopup(popupOpened);
  }
}

export { saveNewProfile, refreshProfile, clickHandler, keydownHandler };
