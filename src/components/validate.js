import { setFormEventListeners } from './modal.js';

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add('form__input_type_invalid');
  errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove('form__input_type_invalid');
  errorElement.textContent = '';
}

function validateInput(formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function enableFormValidation(formElement) {
  const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
  fieldsetList.forEach((fieldset) => {
    setFormEventListeners(fieldset);
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

export {
  showInputError,
  hideInputError,
  validateInput,
  enableFormValidation,
  hasInvalidInput,
};
