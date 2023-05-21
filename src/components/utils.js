import {
  openedPopupClass,
  submitBtnClass,
  profilePopup,
  profileForm,
  placePopup,
  placeForm,
  avatarPopup,
  avatarForm,
  popupClass,
  validationParameters,
} from './commonElements.js';
import { config } from './api.js';
import { closePopup } from './modal.js';
import { toggleLike } from './card.js';
import { deleteCard } from './api.js';
import {
  openProfilePopup,
  openAvatarPopup,
  openPlacePopup,
  openEnlargeImagePopup,
  submitProfileForm,
  submitAvatarForm,
  submitPlaceForm,
} from '../index.js';
import { hideInputError } from './validate.js';

const editProfileBtnClass = 'profile__edit-button';
const editAvatarBtnClass = 'profile__edit-avatar-button';
const addPlaceBtnClass = 'profile__add-button';
const cardImageClass = 'card__image';
const likeBtnClass = 'card__like-button';
const removeCardBtnClass = 'card__remove-button';
const closePopupBtnClass = 'popup__close-button';

function clickHandler(event) {
  const targetClassList = event.target.classList;
  if (targetClassList.contains(editAvatarBtnClass)) {
    openAvatarPopup();
  }
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
    deleteCard(event, config);
  }
  if (targetClassList.contains(closePopupBtnClass)) {
    const popup = event.target.closest('.popup');
    popup.removeEventListener('click', clickHandler);
    closePopup(popup);
  }
  if (targetClassList.contains(submitBtnClass)) {
    const form = event.target.closest('.form');
    switch (form.name) {
      case 'edit-avatar':
        avatarPopup.removeEventListener('click', clickHandler);
        avatarForm.removeEventListener('submit', submitAvatarForm);
        submitAvatarForm(event);
        break;
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

function closeByClickHandler(evt) {
  if (
    evt.target.classList.contains(popupClass) ||
    evt.target.classList.contains(closePopupBtnClass)
  ) {
    closePopup(evt.target.closest(`.${popupClass}`));
  }
}

function renderSubmitStatus(btn, newState) {
  btn.textContent = newState;
}

function setSubmitInactive(btn) {
  btn.classList.add(validationParameters.inactiveBtnClass);
}

function setSubmitActive(btn) {
  btn.classList.remove(validationParameters.inactiveBtnClass);
}

function hideInputsErrors(form) {
  const inputs = form.querySelectorAll(validationParameters.inputSelector);
  inputs.forEach((input) => {
    hideInputError(form, input, validationParameters);
  });
}

export {
  clickHandler,
  closeByClickHandler,
  renderSubmitStatus,
  setSubmitInactive,
  setSubmitActive,
  hideInputsErrors,
};
