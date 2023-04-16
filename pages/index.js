// define profile data
const profile = {
  name: "Жак-Ив Кусто",
  text: "Исследователь океана",
};

const places = {
  "Чагаз-Узун": {
    src: "./images/mars-mountains.jpg",
    alt: "Долина с рыжыми пейзажами на фоне голубых гор",
  },
  Рускеала: {
    src: "./images/ruskeala-failure.jpg",
    alt: "Провал в пещеру",
  },
  Магадан: {
    src: "./images/magadan.jpg",
    alt: "Закат на море в Магадане",
  },
  Якутск: {
    src: "./images/yakutsk.jpg",
    alt: "Лошади в снегу",
  },
  "Петропавловск Камчатский": {
    src: "./images/petropavlovsk-kamchatskiy.jpg",
    alt: "Город у подножия вулкана",
  },
  Молога: {
    src: "./images/flooded-city.jpg",
    alt: "Затопленный монастырь в озере",
  },
};

// define class for opened popup
const openedPopupClass = "popup_opened";

// define 'edit profile' button
const editProfileBtnClass = "profile__edit-button";
const editProfileBtn = document.querySelector(`.${editProfileBtnClass}`);

// define 'edit profile' popup
const editProfilePopupClass = "popup_type_edit-profile";
const editProfilePopup = document.querySelector(`.${editProfilePopupClass}`);

// define 'add place' button
const addPlaceBtnClass = "profile__add-button";
const addPlaceBtn = document.querySelector(`.${addPlaceBtnClass}`);

// define 'add place' popup
const addPlacePopupClass = "popup_type_add-place";
const addPlacePopup = document.querySelector(`.${addPlacePopupClass}`);

// define 'enlarge image' popup
const imagePopupClass = "popup_type_enlarge-image";
const imagePopup = document.querySelector(`.${imagePopupClass}`);

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

// define section cards
const cards = document.querySelector(".cards");

const cardImageClass = "card__image";
const cardImage = document.querySelector(`.${cardImageClass}`);

// define class for 'close popup' button
const popupCloseBtnClass = "popup__close-button";

// define class for 'save form' button
const saveFormBtnClass = "form__save-button";

// define class for 'remove card' button
const removeCardBtnClass = "card__remove-button";

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

// define 'place name' input value
const inputPlaceName = document.querySelector(".form__input[name=place-name]");
// define 'place text' input value
const inputPlaceImage = document.querySelector(
  ".form__input[name=place-image]"
);

// define card template
const cardTemplate = document.querySelector("#card-template").content;

function definePopupBtn(popup, btnClass) {
  return popup.querySelector(`.${btnClass}`);
}

function openPopup(target) {
  let popup;
  let saveFormBtn;

  if (target.classList.value.split(" ").includes(cardImageClass)) {
    popup = imagePopup;
    const image = popup.querySelector(".popup__image");
    image.src = target.src;
    const name = target.parentElement.querySelector(".card__name").textContent;
    const figcaption = popup.querySelector(".popup__figcaption");
    figcaption.textContent = name;
  } else {
    switch (target) {
      case editProfileBtn:
        popup = popups.editProfile.popup;
        // initiate input values with current profile data
        inputProfileName.value = profile.name;
        inputProfileText.value = profile.text;
        break;
      case addPlaceBtn:
        popup = popups.addPlace.popup;
        inputPlaceName.value = "";
        inputPlaceImage.value = "";
        break;
    }
    // define save button for opened popup
    saveFormBtn = definePopupBtn(popup, saveFormBtnClass);
    saveFormBtn.addEventListener("click", submitForm);
  }
  // add open modifier to popup
  popup.classList.add(openedPopupClass);

  // define close button for opened popup
  const popupCloseBtn = definePopupBtn(popup, popupCloseBtnClass);

  // add listeners to close button and save button for opened popup
  popupCloseBtn.addEventListener("click", closePopup);
}

function closePopup(event) {
  // define popup to close
  const clickedBtn = event.target;
  const popup = parentOfClickedBtn(clickedBtn);
  // add close modifier to popup
  popup.classList.remove(openedPopupClass);
}

function submitForm(event) {
  // override the default submit behavior
  event.preventDefault();

  // define opened popup
  const clickedBtn = event.target;
  const popup = parentOfClickedBtn(clickedBtn);

  // define classes of opened popup
  const popupClasses = popup.classList.value.split(" ");

  // read data from form
  const inputData = popup.querySelectorAll(".form__input");

  // save profile if popup is profile form
  if (popupClasses.includes(editProfilePopupClass)) {
    saveProfile(inputData);
  }

  // add place if popup is place form
  if (popupClasses.includes(addPlacePopupClass)) {
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
  createPlace(cardTemplate, data["place-name"], data["place-image"]);
}

function parentOfClickedBtn(btn) {
  let parent = btn.parentElement;
  let parentClasses = parent.classList.value.split(" ");
  while (!parentClasses.includes("popup") && !parentClasses.includes("card")) {
    parent = parent.parentElement;
    parentClasses = parent.classList.value.split(" ");
  }
  return parent;
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

function toggleLike(likeBtn) {
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
    toggleLike(event.target);
  }
  if (targetClasses.includes(removeCardBtnClass)) {
    removePlace(event.target);
  }
  if (targetClasses.includes(cardImageClass)) {
    openPopup(event.target);
  }
}

function createPlace(cardTemplate, placeName, placeImage, imageAlt = "") {
  // create copy of template
  const template = cardTemplate.cloneNode(true);
  // define and initialize card name
  const cardName = template.querySelector(".card__name");
  cardName.textContent = placeName;
  // define and initialize card image
  const cardImage = template.querySelector(".card__image");
  cardImage.src = placeImage;
  cardImage.alt = imageAlt;
  // add card into the cards
  cards.prepend(template);
}

function removePlace(removeBtn) {
  const card = parentOfClickedBtn(removeBtn);
  card.remove();
}

// initialize profile data
refreshProfile();

// initialize place cards
const placesKeys = Object.keys(places);
placesKeys.forEach((key) => {
  createPlace(cardTemplate, key, places[key].src, places[key].alt);
});

// initialize listener for document
document.addEventListener("click", (e) => eventRunner(e));

// TO-DO:
// 2. fix: github pages
// 3. fix: big image width < 320px -> crash
