import './index.css';

import {
  config,
  profileSelectors,
  gallerySelectors,
  buttons,
  templateSelectors,
  cardSelectors,
  popupSelectors,
  forms,
  formSelectors,
  submitStatuses,
} from './utils/constants.js';

import { renderLoading, showError } from './utils/utils.js';

import Api from './components/Api.js';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import UserInfo from './components/UserInfo.js';

// CREATE USER INFO
const userInfo = new UserInfo(profileSelectors);

// CREATE FORM VALIDATORS
const formProfileValidator = new FormValidator(forms.editProfile,formSelectors);
const formAvatarValidator = new FormValidator(forms.changeAvatar,formSelectors);
const formCardValidator = new FormValidator(forms.addCard, formSelectors);

// ENABLE VALIDATION
formProfileValidator.enableValidation();
formAvatarValidator.enableValidation();
formCardValidator.enableValidation();

// WORK WITH POPUPS
const editProfilePopup = new PopupWithForm(
  popupSelectors.popupEditProfileSelector,
  popupSelectors,
  formSelectors,
  handleProfileFormSubmit
);
const changeAvatarPopup = new PopupWithForm(
  popupSelectors.popupChangeAvatarSelector,
  popupSelectors,
  formSelectors,
  handleAvatarFormSubmit
);
const addCardPopup = new PopupWithForm(
  popupSelectors.popupAddCardSelector,
  popupSelectors,
  formSelectors,
  handleCardFormSubmit
);
const showImagePopup = new PopupWithImage(
  popupSelectors.popupShowImageSelector,
  popupSelectors
);

const handlePopupOpening = (popup, formValidator) => {
  if (popup === editProfilePopup) {
    popup.setInputValues(userInfo.getUserInfo());
  };

  formValidator.resetValidation();
  popup.open();
};

// ADD LISTENERS FOR MAIN BUTTONS
buttons.editProfile.addEventListener('click', () => {
  handlePopupOpening(editProfilePopup, formProfileValidator);
});
buttons.changeAvatar.addEventListener('click', () => {
  handlePopupOpening(changeAvatarPopup,formAvatarValidator);
});
buttons.addCard.addEventListener('click', () => {
  handlePopupOpening(addCardPopup, formCardValidator);
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
  api.patchProfile(inputValues)
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

  api.patchAvatar(avatar)
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
    cardSelectors,
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
  api.postCard(inputValues)
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
    api.deleteLike(card.id)
      .then((cardJson) => {
        card.likes = cardJson.likes;
        card.renderLikesData();
      })
      .catch((err) => {
        showError(err);
      });
  } else {
    api.putLike(card.id)
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
  api.deleteCard(card.id)
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
