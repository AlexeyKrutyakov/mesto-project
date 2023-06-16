// data for server authorization
export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-24',
  headers: {
    authorization: '9e2d263a-3d5a-40f2-a16e-27e8711676de',
    'Content-Type': 'application/json',
  },
};

// page
export const page = document.querySelector('.page');

// profile
export const profileSelectors = {
  nameSelector: '.profile__name',
  aboutSelector: '.profile__text',
  avatarSelector: '.profile__avatar-image',
};

// cards
export const gallerySelectors = {
  cardsContainerSelector: '.cards',
};

// buttons
export const buttons = {
  editProfile: page.querySelector('.profile__edit-button'),
  changeAvatar: page.querySelector('.profile__edit-avatar-button'),
  addCard: page.querySelector('.profile__add-button'),
};

// templates
export const templateSelectors = {
  defaultCardSelector: '.default-card-template',
};

// card selectors
export const cardSelectors = {
  cardSelector: '.card',
  nameSelector: '.card__name',
  imageSelector: '.card__image',
  likeBtnSelector: '.card__like-button',
  likeBtnActiveClass: 'card__like-button_active',
  likeNumSelector: '.card__likes-number',
  removeBtnSelector: '.card__remove-button',
};

// popup selectors
export const popupSelectors = {
  popupClass: 'popup',
  popupSelector: '.popup',
  openedPopupClass: 'popup_opened',
  imageSelector: '.popup__image',
  captionSelector: '.popup__figcaption',
  closePopupBtnClass: 'popup__close-button',
  popupEditProfileSelector: '.popup_type_edit-profile',
  popupChangeAvatarSelector: '.popup_type_edit-avatar',
  popupAddCardSelector: '.popup_type_add-place',
  popupShowImageSelector: '.popup_type_enlarge-image',
  popupConfirmDeletionSelector: '.popup_type_confirm-deletion',
};

// forms
export const forms = {
  editProfile: page.querySelector('.form_type_profile-info'),
  changeAvatar: page.querySelector('.form_type_edit-avatar'),
  addCard: page.querySelector('.form_type_place-info'),
};

// parameters for validation
export const formSelectors = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitBtnClass: 'form__submit',
  submitBtnSelector: '.form__submit',
  inactiveBtnClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_invalid',
  errorVisibleClass: 'form__input-error_visible',
};

// status for submit buttons
export const submitStatuses = {
  save: 'Сохранить',
  saving: 'Сохранение...',
  create: 'Создать',
  creating: 'Создание...',
};
