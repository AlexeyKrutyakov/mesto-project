// profile data
const profile = {
  name: "Жак-Ив Кусто",
  text: "Исследователь океана",
};
// initial cards data
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
// POPUPS
// class for opened popup
const classOpenedPopup = "popup_opened";
// popup for edit profile
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
// popup for add place
const popupAddPlace = document.querySelector(".popup_type_add-place");
// popup with 'enlarge image place'
const popupEnlargeImage = document.querySelector(".popup_type_enlarge-image");

// FORMS
// form for edit profile
const formEditProfile = popupEditProfile.querySelector(".form");
// form for add place
const formAddPlace = popupAddPlace.querySelector(".form");
// 'profile name' input value
const inputProfileName = document.querySelector(
  ".form__input[name=profile-name]"
);
// 'profile text' input value
const inputProfileText = document.querySelector(
  ".form__input[name=profile-text]"
);
// define 'place name' input value
const inputPlaceName = formAddPlace.querySelector(
  ".form__input[name=place-name]"
);
// define 'place text' input value
const inputPlaceImage = formAddPlace.querySelector(
  ".form__input[name=place-image]"
);

// BUTTONS
// define class for active 'like' button
const classActiveLikeBtn = "card__like-button_active";
// button for edit profile
const btnEditProfile = document.querySelector(".profile__edit-button");
// 'add place' button
const btnAddPlace = document.querySelector(".profile__add-button");
// button 'close edit-profile popup'
const btnClosePopupEditProfile = popupEditProfile.querySelector(
  ".popup__close-button"
);
// button close 'add place popup'
const btnClosePopupAddPlace = popupAddPlace.querySelector(
  ".popup__close-button"
);
// button close 'enlarge image popup'
const btnClosePopupEnlargeImage = popupEnlargeImage.querySelector(
  ".popup__close-button"
);

// profile name and profile text elements
const elementProfileName = document.querySelector(".profile__name");
const elementProfileText = document.querySelector(".profile__text");
// section cards
const cards = document.querySelector(".cards");
// card template
const templateCard = document.querySelector("#card-template").content;

// FUNCTIONS
function openPopup(popup) {
  popup.classList.add(classOpenedPopup);
}

function closePopup(popup) {
  popup.classList.remove(classOpenedPopup);
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
  formEditProfile.addEventListener("submit", submitFormEditProfile);
}

function openPopupAddPlace() {
  openPopup(popupAddPlace);

  // clear old name and text in input fields
  inputPlaceName.value = "";
  inputPlaceImage.value = "";

  // add listeners for popup buttons
  btnClosePopupAddPlace.addEventListener("click", () =>
    closePopup(popupAddPlace)
  );
  formAddPlace.addEventListener("submit", submitFormAddPlace);
}

function openPopupEnlargeImage(event) {
  const imageLink = event.target.src;
  const placeName = event.target
    .closest(".card")
    .querySelector(".card__name").textContent;
  const popupImage = popupEnlargeImage.querySelector(".popup__image");
  const popupFigcaption = popupEnlargeImage.querySelector(".popup__figcaption");

  popupImage.src = imageLink;
  popupFigcaption.textContent = placeName;

  openPopup(popupEnlargeImage);

  btnClosePopupEnlargeImage.addEventListener("click", () =>
    closePopup(popupEnlargeImage)
  );
}

function submitFormEditProfile(event, form) {
  // undo standard sumbit behavior
  event.preventDefault();

  const name = inputProfileName.value;
  const text = inputProfileText.value;
  // update profile
  saveNewProfile(name, text);
  refreshProfile();

  closePopup(popupEditProfile);
}

function submitFormAddPlace(event) {
  // undo standard sumbit behavior
  event.preventDefault();

  const placeName = inputPlaceName.value;
  const placeImage = inputPlaceImage.value;

  addPlaceCard(placeName, placeImage);

  closePopup(popupAddPlace);
}

function saveNewProfile(name, text) {
  profile["name"] = name;
  profile["text"] = text;
}

function refreshProfile() {
  elementProfileName.textContent = profile.name;
  elementProfileText.textContent = profile.text;
}

function toggleLike(event) {
  const btnLike = event.target;
  const btnClasses = btnLike.classList;
  if (btnClasses.value.split(" ").includes(classActiveLikeBtn)) {
    btnClasses.remove(classActiveLikeBtn);
  } else {
    btnClasses.add(classActiveLikeBtn);
  }
}

function addPlaceCard(placeName, placeImage, imageAlt = "") {
  const newCard = createPlaceCard(placeName, placeImage, imageAlt);
  cards.prepend(newCard);
}

function createPlaceCard(placeName, placeImage, imageAlt = "") {
  // copy of template element
  const placeCard = templateCard.querySelector(".card").cloneNode(true);
  // elements of card
  const cardName = placeCard.querySelector(".card__name");
  const cardImage = placeCard.querySelector(".card__image");
  const btnRemoveCard = placeCard.querySelector(".card__remove-button");
  const btnLikeCard = placeCard.querySelector(".card__like-button");
  // initialize data place into place card
  cardName.textContent = placeName;
  cardImage.src = placeImage;
  if (imageAlt === "") {
    cardImage.alt = "Изображение места " + placeName;
  } else {
    cardImage.alt = imageAlt;
  }
  // add listeners for new place card
  btnRemoveCard.addEventListener("click", removeCard);
  btnLikeCard.addEventListener("click", toggleLike);
  cardImage.addEventListener("click", openPopupEnlargeImage);

  return placeCard;
}

function removeCard(event) {
  const currentCard = event.target.closest(".card");
  currentCard.remove();
}

// initialize place cards
initialCards.forEach((place) => {
  addPlaceCard(place.name, place.link, place.alt);
});

btnEditProfile.addEventListener("click", openPopupEditProfile);
btnAddPlace.addEventListener("click", openPopupAddPlace);
