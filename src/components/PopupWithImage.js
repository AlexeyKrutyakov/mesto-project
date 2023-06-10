import { popupSelectors } from './constants.js';
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(popupSelectors.imageSelector);
    this._figcaption = this._popup.querySelector(
      popupSelectors.captionSelector
    );
  }

  open(name, link) {
    super.open();
    this._figcaption.textContent = name;
    this._image.src = link;
    this._image.alt = name;
  }
}
