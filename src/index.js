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
const editProfilePopup = new PopupWithForm(
  popupSelectors.popupEditProfile,
  handleProfileFormSubmit
);
const changeAvatarPopup = new PopupWithForm(
  popupSelectors.popupChangeAvatar,
  handleAvatarFormSubmit
);
const addCardPopup = new PopupWithForm(
  popupSelectors.popupAddCard,
  handleCardFormSubmit
);
const showImagePopup = new PopupWithImage(popupSelectors.popupShowImage);

// create user info
const userInfo = new UserInfo(profileSelectors);

const handlePopupOpening = (popup, form, formValidator) => {
  formValidator.resetFormErrors();

  const submitBtn = form.querySelector(formSelectors.submitBtnSelector);

  if (popup === editProfilePopup) {
    const { name, about } = userInfo.getUserInfo();
    console.log(about);
    formInputs.inputUserName.value = name;
    formInputs.inputUserAbout.value = about;
    activateSubmitBtn(submitBtn);
  } else {
    inactivateSubmitBtn(submitBtn);
  }

  popup.open();
};

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

const api = new Api(config);

// PROFILE
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
      console.log(`Ошибка: ${err}`);
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

// Обработчик события submit формы редактирования аватара
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
      console.log(`Ошибка: ${err}`);
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

// CARDS
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

const gallery = new Section(gallerySelectors.cardsContainer, renderCard);

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
      console.log(`Ошибка: ${err}`);
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
  if (card.checkLikesData()) {
    api
      .deleteLike(card.id)
      .then((cardJson) => {
        card.likes = cardJson.likes;
        card.renderLikesData();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  } else {
    api
      .putLike(card.id)
      .then((cardJson) => {
        card.likes = cardJson.likes;
        card.renderLikesData();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
};

const handleDeleteClick = (card) => {
  api
    .deleteCard(card.id)
    .then((cardJson) => {
      card.delete();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
};

// create image click handler
const handleImageClick = (name, link) => {
  showImagePopup.open(name, link);
};

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
