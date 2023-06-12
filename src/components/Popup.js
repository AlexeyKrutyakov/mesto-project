import { page, popupSelectors } from '../components/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popup = page.querySelector(popupSelector);
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
      event.target.classList.contains(popupSelectors.closePopupBtnClass)
    ) {
      this.close();
    }
  }

  open() {
    this._popup.classList.add(popupSelectors.openedPopupClass);
    page.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', this._handleClickClose);
  }

  close() {
    this._popup.classList.remove(popupSelectors.openedPopupClass);
    page.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('click', this._handleClickClose);
  }
}
