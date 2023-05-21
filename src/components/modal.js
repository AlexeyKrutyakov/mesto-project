import { closeByClickHandler } from './utils';
import { openedPopupClass } from './commonElements';

function openPopup(popup) {
  popup.classList.add(openedPopupClass);
  document.addEventListener('keydown', keydownHandler);
  popup.addEventListener('click', closeByClickHandler);
}

function closePopup(popup) {
  document.removeEventListener('keydown', keydownHandler);
  popup.removeEventListener('click', closeByClickHandler);
  popup.classList.remove(openedPopupClass);
}

function keydownHandler(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

export { openPopup, closePopup };
