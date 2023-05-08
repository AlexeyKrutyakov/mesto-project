import {
  submitBtnClass,
  profilePopup,
  profileForm,
  placePopup,
  placeForm,
} from './commonElements.js';
import { profile } from './data.js';
import {
  openProfilePopup,
  submitProfileForm,
  openPlacePopup,
  submitPlaceForm,
  openEnlargeImagePopup,
  closePopup,
} from './modal.js';
import { removeCard, toggleLike } from './card.js';

const profileNameElement = document.querySelector('.profile__name');
const profileTextElement = document.querySelector('.profile__text');
const editProfileBtnClass = 'profile__edit-button';
const addPlaceBtnClass = 'profile__add-button';
const cardImageClass = 'card__image';
const likeBtnClass = 'card__like-button';
const removeCardBtnClass = 'card__remove-button';
const closePopupBtnClass = 'popup__close-button';

function saveNewProfile(name, text) {
  profile['name'] = name;
  profile['text'] = text;
}

function refreshProfile() {
  profileNameElement.textContent = profile.name;
  profileTextElement.textContent = profile.text;
}

function clickHandler(event) {
  const targetClassList = event.target.classList;
  if (targetClassList.contains(editProfileBtnClass)) {
    openProfilePopup();
  }
  if (targetClassList.contains(addPlaceBtnClass)) {
    openPlacePopup();
  }
  if (targetClassList.contains(cardImageClass)) {
    openEnlargeImagePopup(event);
  }
  if (targetClassList.contains(likeBtnClass)) {
    toggleLike(event);
  }
  if (targetClassList.contains(removeCardBtnClass)) {
    removeCard(event);
  }
  if (targetClassList.contains(closePopupBtnClass)) {
    const popup = event.target.closest('.popup');
    popup.removeEventListener('click', clickHandler);
    closePopup(popup);
  }
  if (targetClassList.contains(submitBtnClass)) {
    const form = event.target.closest('.form');
    switch (form.name) {
      case 'profile-info':
        profilePopup.removeEventListener('click', clickHandler);
        profileForm.removeEventListener('submit', submitProfileForm);
        submitProfileForm(event);
        break;
      case 'place-info':
        placePopup.removeEventListener('click', clickHandler);
        placeForm.removeEventListener('submit', submitPlaceForm);
        submitPlaceForm(event);
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
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) closePopup(openedPopup);
  }
}

export { saveNewProfile, refreshProfile, clickHandler, keydownHandler };
