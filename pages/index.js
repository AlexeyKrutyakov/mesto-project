// define profile data
const profile = {
  name: "Жак-Ив Куст",
  text: "Исследователь океана",
};

// define class for opened popup
const openedPopupClass = "popup_opened";

// define 'edit profile' button
const editProfileBtn = document.querySelector(".profile__edit-button");

// define 'add place' button
const addPlaceBtn = document.querySelector(".profile__add-button");

// define list of buttons and the popups they open
const popupBtns = {
  "profile__edit-button": "popup_edit-profile",
  "profile__add-button": "popup_add-place",
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

function definePopupBtn(popup, btnClass) {
  return popup.querySelector(btnClass);
}

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

  // define classes of opened popup
  const popupClasses = popup.classList.value.split(" ");

  // read data from form
  const inputData = popup.querySelectorAll(".form__input");

  // save profile if popup is profile form
  if (popupClasses.includes("popup_edit-profile")) {
    saveProfile(inputData);
  }

  // add place if popup is place form
  if (popupClasses.includes("popup_add-place")) {
    addPlace(inputData);
  }

  // refresh profile data into the site
  refreshProfile();

  // close opened popup
  popup.classList.remove(openedPopupClass);
}

function saveProfile(inputData) {
  // extract info from input
  const data = extractDataFromInput(inputData);
  // get keys of data object
  const keys = Object.keys(data);

  // update profile object
  keys.forEach((key) => {
    switch (key) {
      case "profile-name":
        profile.name = data[key];
        break;
      case "profile-text":
        profile.text = data[key];
        break;
    }
  });
}

function refreshProfile() {
  profileNameElement.textContent = profile.name;
  profileTextElement.textContent = profile.text;
}

function addPlace(inputData) {
  const data = extractDataFromInput(inputData);
  console.log("data: ", data);
}

function popupOfClickedBtn(btn) {
  let popup = btn.parentElement;
  while (!popup.classList.value.split(" ").includes("popup")) {
    popup = popup.parentElement;
  }
  return popup;
}

function extractDataFromInput(inputData) {
  const data = {};
  for (let i = 0; i < inputData.length; i++) {
    const name = inputData[i].name;
    const value = inputData[i].value;
    data[name] = value;
  }
  return data;
}

// initialize profile data
refreshProfile();

// add listener to 'edit profile' button
editProfileBtn.addEventListener("click", openPopup);

// add listener to 'add place' button
addPlaceBtn.addEventListener("click", openPopup);

// TO-DO:
// 1. js-like-btn
// 2. js-add-cards
// 3. js-add-new-card
// 4. js-remove-card
