import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, popupSelectors, formSelectors, formSubmitHandler) {
    super(popupSelector, popupSelectors);
    this._formSelectors = formSelectors;
    this._formElement = this._popup.querySelector(this._formSelectors.formSelector);
    this._inputList = this._formElement.querySelectorAll(
      this._formSelectors.inputSelector
    );
    this._formSubmitHandler = formSubmitHandler;
    this._handleClickSubmit = this._handleClickSubmit.bind(this);
  }

  _getInputValues() {
    this._inputValues = [];
    this._inputList.forEach((input) => {
      this._inputValues.push(input.value);
    });
    return this._inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  _handleClickSubmit(event) {
    event.preventDefault();
    this._formSubmitHandler(this._getInputValues());
  }

  open() {
    super.open();
    this._formElement.addEventListener('submit', this._handleClickSubmit);
  }

  close() {
    super.close();
    this._formElement.reset();
    this._formElement.removeEventListener('submit', this._handleClickSubmit);
  }
}
