const popupCloseButton = document.querySelector(".popup__close-button");
let popupClass = "popup";
let openedPopupClass = "popup_opened";

function openPopup(popupClass) {
  const popup = document.querySelector(`.${popupClass}`);

  popup.classList.add(openedPopupClass);
  console.log(popup);
}

function closePopup(evt) {
  const popup = evt.target.parentElement.parentElement;
  console.log(popup);

  popup.classList.remove(openedPopupClass);
}

openPopup(popupClass);

popupCloseButton.addEventListener("click", closePopup);
