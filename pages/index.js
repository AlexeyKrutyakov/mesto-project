// define profile data
const profile = {
  name: "Жак-Ив Кусто",
  text: "Исследователь океана",
};

const initialCards = [
  {
    name: "Чагаз-Узун",
    link: "./images/mars-mountains.jpg",
    alt: "Долина с рыжыми пейзажами на фоне голубых гор",
  },
  {
    name: "Рускеала",
    link: "./images/ruskeala-failure.jpg",
    alt: "Провал в пещеру",
  },
  {
    name: "Магадан",
    link: "./images/magadan.jpg",
    alt: "Закат на море в Магадане",
  },
  {
    name: "Якутск",
    link: "./images/yakutsk.jpg",
    alt: "Лошади в снегу",
  },
  {
    name: "Петропавловск Камчатский",
    link: "./images/petropavlovsk-kamchatskiy.jpg",
    alt: "Город у подножия вулкана",
  },
  {
    name: "Молога",
    link: "./images/flooded-city.jpg",
    alt: "Затопленный монастырь в озере",
  },
];

// define class for opened popup
const openedPopupClass = "popup_opened";

// define class for 'close popup' buttons
const btnClosePopupClass = "popup__close-button";

// define 'edit profile' button
const btnEditProfileClass = "profile__edit-button";
const btnEditProfile = document.querySelector(`.${btnEditProfileClass}`);

// define 'edit profile' popup
const popupEditProfileClass = "popup_type_edit-profile";
const popupEditProfile = document.querySelector(`.${popupEditProfileClass}`);
// define form for edit profile
const formEditProfile = popupEditProfile.querySelector(".form");

// define button 'close edit-profile popup'
const btnClosePopupEditProfile = popupEditProfile.querySelector(
  `.${btnClosePopupClass}`
);

// define button 'submit form edit profile'
const btnSubmitFormEditProfile =
  formEditProfile.querySelector(".form__save-button");

// define 'add place' button
const addPlaceBtnClass = "profile__add-button";
const addPlaceBtn = document.querySelector(`.${addPlaceBtnClass}`);

// define 'add place' popup
const popupAddPlaceClass = "popup_type_add-place";
const popupAddPlace = document.querySelector(`.${popupAddPlaceClass}`);

// define form add place
const formAddPlace = popupAddPlace.querySelector(".form");

// define button 'close add place popup'
const btnClosePopupAddPlace = popupAddPlace.querySelector(
  `.${btnClosePopupClass}`
);

// define button 'submit' form add new place
const btnSubmitFormAddPlace = popupAddPlace.querySelector(".form__save-button");

// define 'enlarge image' popup
const imagePopupClass = "popup_type_enlarge-image";
const imagePopup = document.querySelector(`.${imagePopupClass}`);

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
const profileNameElement = document.querySelector(".profile__name");
const profileTextElement = document.querySelector(".profile__text");

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
const cardTemplate = document.querySelector("#card-template");

function openPopup(popup) {
  popup.classList.add(openedPopupClass);
}

function openPopupEditProfile() {
  openPopup(popupEditProfile);
  // initiate input values with current profile data
  inputProfileName.value = profile.name;
  inputProfileText.value = profile.text;
  // add listeners for popup buttons
  btnClosePopupEditProfile.addEventListener("click", () =>
    closePopup(popupEditProfile)
  );
  btnSubmitFormEditProfile.addEventListener("click", (e) =>
    submitFormEditProfile(e, formEditProfile)
  );
}

function openPopupAddPlace() {
  openPopup(popupAddPlace);
  console.log(popupAddPlace);
  // clear old name and text in input fields
  inputPlaceName.value = "";
  inputPlaceImage.value = "";
  // add listeners for popup buttons
  btnClosePopupAddPlace.addEventListener("click", () =>
    closePopup(popupAddPlace)
  );
  btnSubmitFormAddPlace.addEventListener("click", (e) =>
    submitFormAddPlace(e, formAddPlace)
  );
}

function closePopup(popup) {
  popup.classList.remove(openedPopupClass);
}

function submitFormEditProfile(event, form) {
  // undo standard sumbit behavior
  event.preventDefault();
  // extract info from input
  const data = extractDataFromForm(form);
  // update profile
  saveNewProfile(data);
  refreshProfile();

  closePopup(popupEditProfile);
}

function submitFormAddPlace(event, form) {
  // undo standard sumbit behavior
  event.preventDefault();
  // extract info from input
  const data = extractDataFromForm(form);
  // add new place
  addNewPlace(data);

  closePopup(popupAddPlace);
}

function saveNewProfile(data) {
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

function extractDataFromForm(form) {
  const data = {};
  const inputList = form.querySelectorAll(".form__input");
  for (let i = 0; i < inputList.length; i++) {
    const name = inputList[i].name;
    const value = inputList[i].value;
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

// initialize profile data
refreshProfile();

// initialize place cards

btnEditProfile.addEventListener("click", openPopupEditProfile);
addPlaceBtn.addEventListener("click", openPopupAddPlace);

// TO-DO:
// 2. fix: github pages
// 3. fix: big image width < 320px -> crash
// - openPopupEditProfile <- refactor with fillForm()
