import { putLike, deleteLike } from './api.js';
import { cardElementClass, cardsSection } from './commonElements.js';
import { config } from './api.js';
import { openEnlargeImagePopup, removePlace, toggleLike } from '../index.js';

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
  likedByMe,
  imageAlt = ''
) {
  // copy of template element
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);

  // elements of card
  const cardName = newCard.querySelector('.card__name');
  const cardImage = newCard.querySelector('.card__image');
  const cardLikeButton = newCard.querySelector('.card__like-button');
  const likesNumberElement = newCard.querySelector('.card__likes-number');
  const cardRemoveButton = newCard.querySelector('.card__remove-button');
  if (nonRemovable) {
    cardRemoveButton.classList.add('card__remove-button_hidden');
  }

  // initialize data place into place card
  newCard.setAttribute('data-id', `${placeId}`);
  // likeNumber.textContent = placeLikes;
  renderLikesNumber(likesNumberElement, placeLikes);
  cardName.textContent = placeName;
  cardImage.src = placeImage;
  if (imageAlt === '') {
    cardImage.alt = 'Изображение места ' + placeName;
  } else {
    cardImage.alt = imageAlt;
  }
  if (likedByMe) {
    cardLikeButton.classList.add('card__like-button_active');
  }

  // add listeners
  cardLikeButton.addEventListener('click', toggleLike);
  cardRemoveButton.addEventListener('click', removePlace);
  cardImage.addEventListener('click', openEnlargeImagePopup);

  return newCard;
}

function addCard(card) {
  cardsSection.prepend(card);
}

function hideRemoveButton(card) {
  card.classList.add('card__remove-button_hidden');
}

function renderLikesNumber(likesNubmerElement, likes) {
  likesNubmerElement.textContent = likes;
}

function toggleLikeStatus(btn, likedByMe) {
  if (likedByMe) {
    btn.classList.add(likeBtnActiveClass);
  } else {
    btn.classList.remove(likeBtnActiveClass);
  }
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
  toggleLikeStatus,
};
