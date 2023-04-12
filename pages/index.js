// define profile data
const profile = {
  name: "Жак-Ив Кусто",
  text: "Исследователь океана",
};

// define class for opened popup
const openedPopupClass = "popup_opened";

// define 'edit profile' button
const editProfileBtnClass = "profile__edit-button";
const editProfileBtn = document.querySelector(`.${editProfileBtnClass}`);

// define 'edit profile' popup
const editProfilePopupClass = "popup_edit-profile";
const editProfilePopup = document.querySelector(`.${editProfilePopupClass}`);

// define 'add place' button
const addPlaceBtnClass = "profile__add-button";
const addPlaceBtn = document.querySelector(`.${addPlaceBtnClass}`);

// define 'add place' popup
const addPlacePopupClass = "popup_add-place";
const addPlacePopup = document.querySelector(`.${addPlacePopupClass}`);

// define list of buttons and the popups they open
const popups = {
  editProfile: {
    btn: editProfileBtn,
    popup: editProfilePopup,
  },
  addPlace: {
    btn: addPlaceBtn,
    popup: addPlacePopup,
  },
};

// define class for 'close popup' button
const popupCloseBtnClass = "popup__close-button";

// define class for 'save form' button
const saveFormBtnClass = "form__save-button";

// define class for 'like' button
const likeBtnClass = "card__like-button";

// define class for active 'like' button
const activeLikeBtnClass = "card__like-button_active";

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
  return popup.querySelector(`.${btnClass}`);
}

function openPopup(btn) {
  let popup;
  switch (btn) {
    case editProfileBtn:
      popup = popups.editProfile.popup;
      // initiate input values with current profile data
      inputProfileName.value = profile.name;
      inputProfileText.value = profile.text;
      break;
    case addPlaceBtn:
      popup = popups.addPlace.popup;
      break;
  }
  // add open modifier to popup
  popup.classList.add(openedPopupClass);

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

function toggleLike(event) {
  const likeBtn = event.target;
  const btnClasses = likeBtn.classList;
  if (btnClasses.value.split(" ").includes(activeLikeBtnClass)) {
    btnClasses.remove(activeLikeBtnClass);
  } else {
    btnClasses.add(activeLikeBtnClass);
  }
}

function eventRunner(event) {
  switch (event.target) {
    case editProfileBtn:
      openPopup(editProfileBtn);
      break;
    case addPlaceBtn:
      openPopup(addPlaceBtn);
      break;
  }

  const targetClasses = event.target.classList.value.split(" ");
  if (targetClasses.includes(likeBtnClass)) {
    toggleLike(event);
  }
}

// initialize profile data
refreshProfile();

// initialize listener for document
document.addEventListener("click", (e) => eventRunner(e));

// TO-DO:
// 1. js-like-btn
// 2. js-add-cards
// 3. js-add-new-card
// 4. js-remove-card
