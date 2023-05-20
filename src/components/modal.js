import { keydownHandler } from './utils.js';

const openedPopupClass = 'popup_opened';

function openPopup(popup) {
  popup.classList.add(openedPopupClass);
  document.addEventListener('keydown', keydownHandler);
}

function closePopup(popup) {
  document.removeEventListener('keydown', keydownHandler);
  popup.classList.remove(openedPopupClass);
}

export { openPopup, closePopup };
