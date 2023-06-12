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
  submitStatuses,
} from './components/constants.js';

import {
  renderLoading,
  inactivateSubmitBtn,
  activateSubmitBtn,
  showError,
} from './components/utils.js';

import Api from './components/Api.js';
import Card from './components/Card.js';
import FormValidator from './components/formValidator.js';
import Section from './components/Section.js';
import PopupWithForm from './components/PopupWithForm';
import PopupWithImage from './components/PopupWithImage';
import UserInfo from './components/UserInfo.js';

// CREATE USER INFO
const userInfo = new UserInfo(profileSelectors);

// CREATE FORM VALIDATORS
const formProfileValidator = new FormValidator(
  forms.editProfile,
  formSelectors
);

const formAvatarValidator = new FormValidator(
  forms.changeAvatar,
  formSelectors
);
const formCardValidator = new FormValidator(forms.addCard, formSelectors);

// ENABLE VALIDATION
formProfileValidator.enableValidation();
formAvatarValidator.enableValidation();
formCardValidator.enableValidation();

// WORK WITH POPUPS
const editProfilePopup = new PopupWithForm(
  popupSelectors.popupEditProfileSelector,
  handleProfileFormSubmit
);
const changeAvatarPopup = new PopupWithForm(
  popupSelectors.popupChangeAvatarSelector,
  handleAvatarFormSubmit
);
const addCardPopup = new PopupWithForm(
  popupSelectors.popupAddCardSelector,
  handleCardFormSubmit
);
const showImagePopup = new PopupWithImage(
  popupSelectors.popupShowImageSelector
);

const handlePopupOpening = (popup, form, formValidator) => {
  formValidator.resetFormErrors();

  const submitBtn = form.querySelector(formSelectors.submitBtnSelector);

  if (popup === editProfilePopup) {
    const { name, about } = userInfo.getUserInfo();
    console.log(about);
    formInputs.userName.value = name;
    formInputs.userAbout.value = about;
    activateSubmitBtn(submitBtn);
  } else {
    inactivateSubmitBtn(submitBtn);
  }

  popup.open();
};

// ADD LISTENERS FOR MAIN BUTTONS
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

const api = new Api(config);

// WORK WITH PROFILE
function handleProfileFormSubmit(inputValues) {
  renderLoading(
    true,
    forms.editProfile,
    submitStatuses.saving,
    submitStatuses.save
  );
  api
    .patchProfile(inputValues)
    .then((profileJson) => {
      userInfo.setUserInfo(profileJson);
      editProfilePopup.close();
    })
    .catch((err) => {
      showError(err);
    })
    .finally(() => {
      renderLoading(
        false,
        forms.editProfile,
        submitStatuses.saving,
        submitStatuses.save
      );
    });
}

function handleAvatarFormSubmit(avatar) {
  renderLoading(
    true,
    forms.changeAvatar,
    submitStatuses.saving,
    submitStatuses.save
  );

  api
    .patchAvatar(avatar)
    .then((profileJson) => {
      userInfo.setAvatar(profileJson);
      changeAvatarPopup.close();
    })
    .catch((err) => {
      showError(err);
    })
    .finally(() => {
      renderLoading(
        false,
        forms.changeAvatar,
        submitStatuses.saving,
        submitStatuses.save
      );
    });
}

// WORK WITH CARDS
function renderCard(cardData) {
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

const gallery = new Section(
  gallerySelectors.cardsContainerSelector,
  renderCard
);

function handleCardFormSubmit(inputValues) {
  renderLoading(
    true,
    forms.changeAvatar,
    submitStatuses.saving,
    submitStatuses.save
  );
  api
    .postCard(inputValues)
    .then((cardJson) => {
      const cardData = cardJson;
      const card = renderCard(cardData);
      gallery.addItem(card);
      addCardPopup.close();
    })
    .catch((err) => {
      showError(err);
    })
    .finally(() => {
      renderLoading(
        false,
        forms.changeAvatar,
        submitStatuses.saving,
        submitStatuses.save
      );
    });
}

const handleLikeClick = (card) => {
  if (card.hasMyLike()) {
    api
      .deleteLike(card.id)
      .then((cardJson) => {
        card.likes = cardJson.likes;
        card.renderLikesData();
      })
      .catch((err) => {
        showError(err);
      });
  } else {
    api
      .putLike(card.id)
      .then((cardJson) => {
        card.likes = cardJson.likes;
        card.renderLikesData();
      })
      .catch((err) => {
        showError(err);
      });
  }
};

const handleDeleteClick = (card) => {
  api
    .deleteCard(card.id)
    .then(() => {
      card.delete();
    })
    .catch((err) => {
      showError(err);
    });
};

const handleImageClick = (name, link) => {
  showImagePopup.open(name, link);
};

// RENDER INITIAL CONTENT
const renderInitialContent = () => {
  Promise.all([api.getProfile(), api.getInitialCards()])
    .then(([profileJson, cardsJson]) => {
      userInfo.setUserInfo(profileJson);
      userInfo.setAvatar(profileJson);

      gallery.renderItems(cardsJson);
    })
    .catch(([getProfileDataErr, getCardsDataErr]) => {
      showError(getProfileDataErr);
      showError(getCardsDataErr);
    });
};

renderInitialContent();
