import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, popupSelectors, popupSubmitHandler) {
    super(popupSelector, popupSelectors);
    this._submitBtn = this._popup.querySelector(
      this._popupSelectors.submitBtnSelector
    );
    this._popupSubmitHandler = popupSubmitHandler;
    this._handleClickSubmit = this._handleClickSubmit.bind(this);
  }

  _handleClickSubmit(event) {
    event.preventDefault();
    this._popupSubmitHandler();
  }

  open(card) {
    super.open();
    this._card = card;
    this._submitBtn.addEventListener('click', this._handleClickSubmit);
  }

  close() {
    this._submitBtn.removeEventListener('click', this._handleClickSubmit);
    super.close();
  }
}
