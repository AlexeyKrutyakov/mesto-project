import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupSelectors) {
    super(popupSelector, popupSelectors);
    this._image = this._popup.querySelector(this._popupSelectors.imageSelector);
    this._figcaption = this._popup.querySelector(
      this._popupSelectors.captionSelector
    );
  }

  open(name, link) {
    super.open();
    this._figcaption.textContent = name;
    this._image.src = link;
    this._image.alt = name;
  }
}
