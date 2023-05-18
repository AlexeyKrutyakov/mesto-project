import {
  submitBtnClass,
  profilePopup,
  profileForm,
  placePopup,
  placeForm,
} from './commonElements.js';
import { serverInfo } from './data.js';
import {
  openProfilePopup,
  submitProfileForm,
  openPlacePopup,
  submitPlaceForm,
  openEnlargeImagePopup,
  closePopup,
} from './modal.js';
import { toggleLike } from './card.js';
import { deleteCard } from './api.js';

const profileNameElement = document.querySelector('.profile__name');
const profileTextElement = document.querySelector('.profile__text');
const editProfileBtnClass = 'profile__edit-button';
const addPlaceBtnClass = 'profile__add-button';
const cardImageClass = 'card__image';
const likeBtnClass = 'card__like-button';
const removeCardBtnClass = 'card__remove-button';
const closePopupBtnClass = 'popup__close-button';

function renderProfile(json) {
  profileNameElement.textContent = json.name;
  profileTextElement.textContent = json.about;
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
    deleteCard(event, `${serverInfo.baseUrl}/cards`, serverInfo.token);
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
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

export { renderProfile, clickHandler, keydownHandler };
