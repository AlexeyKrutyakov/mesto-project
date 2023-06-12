export default class FormValidator {
  constructor(formElement, selectors) {
    this._form = formElement;
    this._selectors = selectors;
    this._submitBtn = this._form.querySelector(
      this._selectors.submitBtnSelector
    );
    this._inputList = Array.from(
      this._form.querySelectorAll(this._selectors.inputSelector)
    );
  }

  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(
      `.${inputElement.name}-error`
    );
    inputElement.classList.add(this._selectors.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._selectors.errorVisibleClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(
      `.${inputElement.name}-error`
    );
    inputElement.classList.remove(this._selectors.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._selectors.errorVisibleClass);
  }

  _validateInput(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this._submitBtn.classList.add(this._selectors.inactiveBtnClass);
      this._submitBtn.disabled = true;
    } else {
      this._submitBtn.classList.remove(this._selectors.inactiveBtnClass);
      this._submitBtn.disabled = false;
    }
  }

  enableValidation() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._validateInput(inputElement);
        this._toggleButtonState(this._inputList);
      });
    });
  }

  resetFormErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
