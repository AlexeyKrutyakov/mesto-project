import './index.css';

import {
  config,
  profileSelectors,
  gallerySelectors,
  buttons,
  templateSelectors,
  popupSelectors,
  forms,
  formInputs,
  formSelectors,
  submitStatus,
} from './components/constants.js';

import {
  renderLoading,
  inactivateSubmitBtn,
  activateSubmitBtn,
} from './components/utils.js';

import Api from './components/Api.js';
import Card from './components/Card.js';
import FormValidator from './components/formValidator.js';
import Section from './components/Section.js';
import PopupWithForm from './components/PopupWithForm';
import PopupWithImage from './components/PopupWithImage';
import UserInfo from './components/UserInfo.js';

// create form validators
const formProfileValidator = new FormValidator(
  forms.editProfile,
  formSelectors
);
const formAvatarValidator = new FormValidator(
  forms.changeAvatar,
  formSelectors
);
const formCardValidator = new FormValidator(forms.addCard, formSelectors);

// enable validation
formProfileValidator.enableValidation();
formAvatarValidator.enableValidation();
formCardValidator.enableValidation();

// create popups
const editProfilePopup = new PopupWithForm(popupSelectors.popupEditProfile);
const changeAvatarPopup = new PopupWithForm(popupSelectors.popupChangeAvatar);
const addCardPopup = new PopupWithForm(popupSelectors.popupAddCard);
const showImagePopup = new PopupWithImage(popupSelectors.popupShowImage);

// create user info
const userInfo = new UserInfo(profileSelectors);

// add listeners to main buttons
buttons.editProfile.addEventListener('click', () => {
  handlePopupOpening(editProfilePopup, forms.editProfile, formProfileValidator);
});
buttons.changeAvatar.addEventListener('click', () => {
  handlePopupOpening(
    changeAvatarPopup,
    forms.changeAvatar,
    formAvatarValidator
  );
});
buttons.addCard.addEventListener('click', () => {
  handlePopupOpening(addCardPopup, forms.addCard, formCardValidator);
});

const handlePopupOpening = (popup, form, formValidator) => {
  formValidator.resetFormErrors();

  const submitBtn = form.querySelector(formSelectors.submitBtnSelector);

  if (popup === editProfilePopup) {
    const { name, about } = userInfo.getUserInfo();
    formInputs.inputUserName.value = name;
    formInputs.inputUserAbout.value = about;
    activateSubmitBtn(submitBtn);
  } else {
    inactivateSubmitBtn(submitBtn);
  }
};

function renderCard() {
  const card = new Card(
    cardData,
    userInfo.id,
    templateSelectors.defaultCardSelector,
    handleImageClick,
    handleLikeClick,
    handleDeleteClick
  );

  const cardElement = card.create();
  return cardElement;
}

const gallery = new Section(gallerySelectors.cardsContainer, renderCard);

const api = new Api(config);


const handleLikeClick = (card) => {  
  if (card.checkLikesData()) {
    api.deleteLike(card.id)
      .then((cardJson) => {
        card.likes = cardJson.likes;
        card.renderLikesData();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  } else {
    api.putLike(card.id)
      .then((cardJson) => {
        card.likes = cardJson.likes;
        card.renderLikesData();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
}

const handleDeleteClick = (card) => {  
  api.deleteCard(card.id)
    .then((cardJson) => {
      card.delete();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

// create image click handler
const handleImageClick = (name, link) => {
  popupShowImage.open(name, link);
}

const renderInitialContent = () => {
  Promise.all([api.getProfile(), api.getInitialCards()])
    .then((data) => {
      // destructurization ?
      const profileJson = data[0];
      userInfo.setUserInfo(profileJson);
      userInfo.setAvatar(profileJson);

      const cardsJson = data[1];
      gallery.renderItems(cardsJson);
    })
    .catch((err) => {
      const profileDataErr = err[0];
      const cardsDataErr = err[1];
      console.log(`Ошибка: ${profileDataErr}`);
      console.log(`Ошибка: ${cardsDataErr}`);
    });
};

renderInitialContent();

//
//
//
// OLD CODE

// add listeners

editAvatarBtn.addEventListener('click', openAvatarPopup);
editProfileBtn.addEventListener('click', openProfilePopup);
addPlaceBtn.addEventListener('click', openPlacePopup);
avatarForm.addEventListener('submit', submitAvatarForm);
profileForm.addEventListener('submit', submitProfileForm);
placeForm.addEventListener('submit', submitPlaceForm);

// functions works with profile

function renderProfileInfo(name, about) {
  profileName.textContent = name;
  profileAbout.textContent = about;
}

function openProfilePopup() {
  openPopup(profilePopup);
  hideInputsErrors(profileForm);

  // initiate input values with current profile data
  profileNameInput.value = profileName.textContent;
  profileTextInput.value = profileAbout.textContent;

  setSubmitActive(profileSubmitBnt);
}

function submitProfileForm(event) {
  // undo standard sumbit behavior
  event.preventDefault();

  renderSubmitStatus(profileSubmitBnt, submitStatus.saving);

  // update profile
  patchProfile(profileNameInput.value, profileTextInput.value)
    .then((json) => {
      renderProfileInfo(json.name, json.about);
      closePopup(profilePopup);
    })
    .catch((err) => {
      show(err);
    })
    .finally(() => {
      renderSubmitStatus(profileSubmitBnt, submitStatus.save);
    });
}

// functions works with avatar

function renderAvatar(link) {
  avatarImage.src = link;
}

function openAvatarPopup() {
  avatarForm.reset();
  setSubmitInactive(avatarSubmitBtn);
  hideInputError(avatarForm, avatarImageInput, validationParameters);
  openPopup(avatarPopup);
}

function submitAvatarForm(event) {
  // undo standard sumbit behavior
  event.preventDefault();

  renderSubmitStatus(avatarSubmitBtn, submitStatus.saving);

  // change avatar
  patchAvatar(avatarImageInput.value)
    .then((json) => {
      renderAvatar(json.avatar);
      closePopup(avatarPopup);
    })
    .catch((err) => {
      show(err);
    })
    .finally(() => {
      renderSubmitStatus(avatarSubmitBtn, submitStatus.save);
    });
}

// functions works with cards

function openPlacePopup() {
  placeForm.reset();
  hideInputError(placeForm, placeNameInput, placeImageInput);
  setSubmitInactive(placeSubmitBtn);
  openPopup(placePopup);
}

function submitPlaceForm(event) {
  // undo standard sumbit behavior
  event.preventDefault();

  renderSubmitStatus(placeSubmitBtn, submitStatus.creating);

  postCard(placeNameInput.value, placeImageInput.value)
    .then((json) => {
      const newCard = createCard(
        json.likes.length,
        json._id,
        json.name,
        json.link,
        false,
        false
      );
      addCard(newCard);
      closePopup(placePopup);
    })
    .catch((err) => {
      show(err);
    })
    .finally(() => {
      renderSubmitStatus(placeSubmitBtn, submitStatus.create);
    });
}

function removePlace(cardId, card) {
  deleteCard(cardId)
    .then((json) => {
      if (json.message === 'Пост удалён') {
        card.remove();
      }
    })
    .catch((err) => {
      show(err);
    });
}

function toggleLike(likeBtn, placeId, likesNumberElement) {
  const isLikeActive = likeBtn.classList.contains(cardLikeBtnActiveClass);
  if (isLikeActive) {
    deleteLike(placeId)
      .then((json) => {
        likeBtn.classList.remove(cardLikeBtnActiveClass);
        renderLikesNumber(likesNumberElement, json.likes.length);
      })
      .catch((err) => show(err));
  } else {
    putLike(placeId)
      .then((json) => {
        likeBtn.classList.add(cardLikeBtnActiveClass);
        renderLikesNumber(likesNumberElement, json.likes.length);
      })
      .catch((err) => show(err));
  }
}

function openEnlargeImagePopup(event) {
  const imageLink = event.target.src;
  const placeName = event.target
    .closest(`.${cardElementClass}`)
    .querySelector(`.${cardNameClass}`).textContent;

  enlargeImage.src = imageLink;
  enlargeImage.alt = 'Увеличенное изображение места ' + placeName;
  figcaption.textContent = placeName;

  openPopup(enlargeImagePopup);
}

export {
  profileId,
  renderAvatar,
  openProfilePopup,
  openAvatarPopup,
  openPlacePopup,
  openEnlargeImagePopup,
  submitProfileForm,
  submitAvatarForm,
  submitPlaceForm,
  removePlace,
  toggleLike,
};
