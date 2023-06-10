import { page, popupSelectors } from '../components/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popup = page.querySelector(popupSelector);
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
    this._popup.addEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.addEventListener('click', this._handleClickClose.bind(this));
  }

  close() {
    this._popup.classList.remove(popupSelectors.openedPopupClass);
    this._popup.removeEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.removeEventListener('click', this._handleClickClose.bind(this));
  }
}
