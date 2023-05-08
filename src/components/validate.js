import { toggleButtonState } from './modal.js';

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

function enableValidation(params) {
  const forms = document.querySelectorAll(params.formSelector);
  forms.forEach((form) => {
    const inputs = Array.from(form.querySelectorAll(params.inputSelector));
    const submitBtn = form.querySelector(params.submitButtonSelector);

    toggleButtonState(inputs, submitBtn);

    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        validateInput(form, input);
        toggleButtonState(inputs, submitBtn);
      });
    });
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
  enableValidation,
  hasInvalidInput,
};
