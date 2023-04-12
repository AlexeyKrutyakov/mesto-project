// define profile data
const profile = {
  name: "Жак-Ив Кусто",
  text: "Исследователь океана",
};

// define class for opened popup
const openedPopupClass = "popup_opened";

// define 'edit profile' button
const editProfileBtn = document.querySelector(".profile__edit-button");

// define 'add card' button
const addCardBtn = document.querySelector(".profile__add-button");

// define list of buttons and the popups they open
const popupBtns = {
  "profile__edit-button": "popup_edit-profile",
  "profile__add-button": "popup_add-card",
};

// define class for 'close popup' button
const popupCloseBtnClass = ".popup__close-button";

// define class for 'save form' button
const saveFormBtnClass = ".form__save-button";

// define profile name and profile text elements
let profileNameElement = document.querySelector(".profile__name");
let profileTextElement = document.querySelector(".profile__text");

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
  const popup = document.querySelector(`.${popupClass}`);
  // add open modifier to popup
  popup.classList.add(openedPopupClass);

  // initiate input values with current profile data
  inputProfileName.value = profile.name;
  inputProfileText.value = profile.text;

  // define close button for opened popup
  const popupCloseBtn = definePopupBtn(popup, popupCloseBtnClass);

  // define save button for opened popup
  const saveFormBtn = definePopupBtn(popup, saveFormBtnClass);

  // add listeners to close button and save button for opened popup
  popupCloseBtn.addEventListener("click", closePopup);
  saveFormBtn.addEventListener("click", submitForm);
}

function definePopupBtn(popup, btnClass) {
  return popup.querySelector(btnClass);
}

function closePopup(event) {
  // define popup to close
  const clickedBtn = event.target;
  const popup = popupOfClickedBtn(clickedBtn);
  // add close modifier to popup
  popup.classList.remove(openedPopupClass);
}

function submitForm(event) {
  // override the default submit behavior
  event.preventDefault();

  // define opened popup
  const clickedBtn = event.target;
  const popup = popupOfClickedBtn(clickedBtn);

  // read data from form and put into the profile
  const name = inputProfileName.value;
  const text = inputProfileText.value;
  saveProfile(name, text);

  // refresh profile data into the site
  refreshProfile();

  // close opened popup
  popup.classList.remove(openedPopupClass);
}

function saveProfile(name, text) {
  profile.name = name;
  profile.text = text;
}

function refreshProfile() {
  profileNameElement.textContent = profile.name;
  profileTextElement.textContent = profile.text;
}

function popupOfClickedBtn(btn) {
  let popup = btn.parentElement;
  while (!popup.classList.value.split(" ").includes("popup")) {
    popup = popup.parentElement;
  }
  return popup;
}

// initialize profile data
refreshProfile();

// add listener to 'edit profile' button
editProfileBtn.addEventListener("click", openPopup);

// add listener to 'add card' button
addCardBtn.addEventListener("click", openPopup);

// TO-DO: fix add card popup in index.htmll
