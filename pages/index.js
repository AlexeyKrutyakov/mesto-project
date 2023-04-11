// define class for opened popup
const openedPopupClass = "popup_opened";

// define list of buttons and the popups they open
const popupBtns = {
  "profile__edit-button": "popup_edit-profile",
  "profile__add-button": "popup_add-card",
};

// define 'edit profile' button
const editProfileBtnClass = "profile__edit-button";
const editProfileBtn = document.querySelector(`.${editProfileBtnClass}`);

// define 'add card' button
const addCardBtnClass = "profile__add-button";
const addCardBtn = document.querySelector(`.${addCardBtnClass}`);

// define class for 'close popup' button
const popupCloseButtonClass = "popup__close-button";

// define class for 'save form' button
const saveFormButtonClass = "form__save-button";

// define profile name and profile text elements
const profileName = document.querySelector(".profile__name");
const profileText = document.querySelector(".profile__text");

// define 'profile name' input value
const inputProfileName = document.querySelector(
  ".form__input[name=profile-name]"
);
// define 'profile text' input value
const inputProfileText = document.querySelector(
  ".form__input[name=profile-text]"
);

function openPopup(event) {
  // select all classes of clicked button
  const btnClasses = event.target.classList.value.split(" ");
  // find the class of popup that opens with a clicked button
  const popupBtnsKeys = Object.keys(popupBtns);
  let popupClass = "";

  for (let i = 0; i < btnClasses.length; i++) {
    const btnClass = btnClasses[i];
    if (popupBtnsKeys.includes(btnClass)) {
      popupClass = popupBtns[btnClass];
      break;
    }
  }

  // select the popup to open
  popup = document.querySelector(`.${popupClass}`);
  // add open modifier to popup
  popup.classList.add(openedPopupClass);

  // define closse button for opened popup
  const popupCloseButton = popup.querySelector(`.${popupCloseButtonClass}`);
  // define save button for opened popup
  const saveFormButton = popup.querySelector(`.${saveFormButtonClass}`);

  // add listeners to close button and save button for opened popup
  popupCloseButton.addEventListener("click", closePopup);
  saveFormButton.addEventListener("click", saveForm);
}

function closePopup(event) {
  // define popup to close
  popup = event.target.parentElement.parentElement;
  // add close modifier to popup
  popup.classList.remove(openedPopupClass);
}

function saveForm() {
  alert("funct: saveForm");
}

// initiate input values with current profile data
inputProfileName.value = profileName.textContent;
inputProfileText.value = profileText.textContent;

// add listener to 'edit profile' button
editProfileBtn.addEventListener("click", openPopup);
// add listener to 'add card' button
addCardBtn.addEventListener("click", openPopup);
