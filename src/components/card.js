import { putLike, deleteLike } from './api.js';
import { cardsSection } from './commonElements.js';
import { config } from './api.js';
import { profileId } from './data.js';

const cardTemplate = document.querySelector('#card-template').content;
const classActiveLikeBtn = 'card__like-button_active';

function addPlaceCard(
  placeLikes,
  placeId,
  placeName,
  placeImage,
  nonRemovable,
  hasMyLike,
  imageAlt = ''
) {
  const newCard = createPlaceCard(
    placeLikes,
    placeId,
    placeName,
    placeImage,
    nonRemovable,
    hasMyLike,
    imageAlt
  );
  cardsSection.prepend(newCard);
}

function createPlaceCard(
  placeLikes,
  placeId,
  placeName,
  placeImage,
  nonRemovable,
  hasMyLike,
  imageAlt = ''
) {
  // copy of template element
  const placeCard = cardTemplate.querySelector('.card').cloneNode(true);
  // elements of card
  const cardName = placeCard.querySelector('.card__name');
  const cardImage = placeCard.querySelector('.card__image');
  const cardLikeButton = placeCard.querySelector('.card__like-button');
  const likeNumber = placeCard.querySelector('.card__likes-number');
  const cardRemoveButton = placeCard.querySelector('.card__remove-button');
  if (nonRemovable) {
    cardRemoveButton.classList.add('card__remove-button_hidden');
  }
  // initialize data place into place card
  placeCard.id = placeId;
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
  return placeCard;
}

function hideRemoveButton(card) {
  card.classList.add('card__remove-button_hidden');
}

function toggleLike(event) {
  const btnLike = event.target;
  const btnClasses = btnLike.classList;
  const card = btnLike.parentElement;
  if (Array.from(btnLike.classList).includes(classActiveLikeBtn)) {
    deleteLike(config, card);
  } else {
    putLike(config, card);
  }

  btnClasses.toggle(classActiveLikeBtn);
}

function renderLikesNumber(card, likes) {
  const likesNumber = card.querySelector('.card__likes-number');
  likesNumber.textContent = likes;
}

function hasMyLike(request, myId) {
  let result = false;
  request.likes.forEach((like) => {
    if (like._id === myId) result = true;
  });
  return result;
}

export {
  addPlaceCard,
  createPlaceCard,
  hideRemoveButton,
  toggleLike,
  renderLikesNumber,
  hasMyLike,
};
