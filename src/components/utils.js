import { popupClass, validationParameters } from './commonElements.js';
import { closePopup } from './modal.js';
import { hideInputError } from './validate.js';

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
  btn.setAttribute('disabled', '');
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
