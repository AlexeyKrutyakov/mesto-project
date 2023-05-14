function showInputError(formElement, inputElement, errorMessage, params) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(params.inputErrorClass);
  errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement, params) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(params.inputErrorClass);
  errorElement.textContent = '';
}

function validateInput(form, input, params) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity('');
  }

  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, params);
  } else {
    hideInputError(form, input, params);
  }
}

function toggleButtonState(form, inputs, params) {
  const btn = form.querySelector(params.submitButtonSelector);
  const inactiveBtnClass = params.inactiveBtnClass;

  if (hasInvalidInput(inputs)) {
    btn.classList.add(inactiveBtnClass);
    btn.disabled = true;
  } else {
    btn.classList.remove(inactiveBtnClass);
    btn.disabled = false;
  }
}

function enableValidation(params) {
  const forms = document.querySelectorAll(params.formSelector);
  forms.forEach((form) => {
    const inputs = Array.from(form.querySelectorAll(params.inputSelector));

    toggleButtonState(form, inputs, params);

    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        validateInput(form, input, params);
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
  toggleButtonState,
};
