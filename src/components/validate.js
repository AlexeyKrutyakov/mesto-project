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

function validateInput(form, input) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity('');
  }

  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
}

function enableValidation(params) {
  const forms = document.querySelectorAll(params.formSelector);
  forms.forEach((form) => {
    const inputs = Array.from(form.querySelectorAll(params.inputSelector));

    toggleButtonState(form, inputs, params);

    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        validateInput(form, input);
        toggleButtonState(form, inputs, params);
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
