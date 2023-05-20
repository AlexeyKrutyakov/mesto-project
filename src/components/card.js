import { putLike, deleteLike } from './api.js';
import { cardsSection } from './commonElements.js';
import { config } from './api.js';
import { openEnlargeImagePopup } from '../index.js';

const cardTemplate = document.querySelector('#card-template').content;
const likeBtnActiveClass = 'card__like-button_active';

function isMyCard(card, myId) {
  return card.owner._id === myId;
}

function createCard(
  placeLikes,
  placeId,
  placeName,
  placeImage,
  nonRemovable,
  hasMyLike,
  imageAlt = ''
) {
  // copy of template element
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);

  // elements of card
  const cardName = newCard.querySelector('.card__name');
  const cardImage = newCard.querySelector('.card__image');
  const cardLikeButton = newCard.querySelector('.card__like-button');
  const likeNumber = newCard.querySelector('.card__likes-number');
  const cardRemoveButton = newCard.querySelector('.card__remove-button');
  if (nonRemovable) {
    cardRemoveButton.classList.add('card__remove-button_hidden');
  }

  // initialize data place into place card
  newCard.setAttribute('data-id', `${placeId}`);
  likeNumber.textContent = placeLikes;
  cardName.textContent = placeName;
  cardImage.src = placeImage;
  if (imageAlt === '') {
    cardImage.alt = 'Изображение места ' + placeName;
  } else {
    cardImage.alt = imageAlt;
  }
  if (hasMyLike) {
    cardLikeButton.classList.add('card__like-button_active');
  }

  // add listeners
  cardLikeButton.addEventListener('click', toggleLike);
  cardRemoveButton.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', openEnlargeImagePopup);

  return newCard;
}

function addCard(card) {
  cardsSection.prepend(card);
}

function deleteCard(card) {}

function hideRemoveButton(card) {
  card.classList.add('card__remove-button_hidden');
}

function toggleLike(event) {
  const btnLike = event.target;
  const btnClasses = btnLike.classList;
  const card = btnLike.parentElement;
  if (btnLike.classList.contains(likeBtnActiveClass)) {
    deleteLike(config, card);
  } else {
    putLike(config, card);
  }

  btnClasses.toggle(likeBtnActiveClass);
}

function renderLikesNumber(card, likes) {
  const likesNumber = card.querySelector('.card__likes-number');
  likesNumber.textContent = likes;
}

function hasMyLike(card, myId) {
  return card.likes.some((like) => like._id === myId);
}

export {
  isMyCard,
  createCard,
  addCard,
  hideRemoveButton,
  toggleLike,
  renderLikesNumber,
  hasMyLike,
};
