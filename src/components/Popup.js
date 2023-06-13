export default class Popup {
  constructor(popupSelector, popupSelectors) {
    this._popup = document.querySelector(popupSelector);
    this._popupSelectors = popupSelectors;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickClose = this._handleClickClose.bind(this);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _handleClickClose(event) {
    if (
      event.target === this._popup ||
      event.target.classList.contains(this._popupSelectors.closePopupBtnClass)
    ) {
      this.close();
    }
  }

  open() {
    this._popup.classList.add(this._popupSelectors.openedPopupClass);
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', this._handleClickClose);
  }

  close() {
    this._popup.classList.remove(this._popupSelectors.openedPopupClass);
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('click', this._handleClickClose);
  }
}
