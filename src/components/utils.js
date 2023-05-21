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

function show(any) {
  console.log(any);
}

export {
  closeByClickHandler,
  renderSubmitStatus,
  setSubmitInactive,
  setSubmitActive,
  hideInputsErrors,
  show,
};
