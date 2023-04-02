const profileEditButton = document.querySelector(".profile__edit-button");
const popupClass = "popup";
const popup = document.querySelector(`.${popupClass}`);
const openedPopupClass = "popup_opened";
const popupCloseButtonClass = "popup__close-button";
const popupCloseButton = document.querySelector(`.${popupCloseButtonClass}`);

function openPopup() {
  popup.classList.add(openedPopupClass);
  popupCloseButton.addEventListener("click", closePopup);
}

function closePopup() {
  popup.classList.remove(openedPopupClass);
}

profileEditButton.addEventListener("click", openPopup);
