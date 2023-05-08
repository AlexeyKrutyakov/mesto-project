import { cardsSection } from './commonElements.js';

const cardTemplate = document.querySelector('#card-template').content;
const classActiveLikeBtn = 'card__like-button_active';

function addPlaceCard(placeName, placeImage, imageAlt = '') {
  const newCard = createPlaceCard(placeName, placeImage, imageAlt);
  cardsSection.prepend(newCard);
}

function createPlaceCard(placeName, placeImage, imageAlt = '') {
  // copy of template element
  const placeCard = cardTemplate.querySelector('.card').cloneNode(true);
  // elements of card
  const cardName = placeCard.querySelector('.card__name');
  const cardImage = placeCard.querySelector('.card__image');
  // initialize data place into place card
  cardName.textContent = placeName;
  cardImage.src = placeImage;
  if (imageAlt === '') {
    cardImage.alt = 'Изображение места ' + placeName;
  } else {
    cardImage.alt = imageAlt;
  }

  return placeCard;
}

function removeCard(event) {
  const currentCard = event.target.closest('.card');
  currentCard.remove();
}

function toggleLike(event) {
  const btnLike = event.target;
  const btnClasses = btnLike.classList;
  btnClasses.toggle(classActiveLikeBtn);
}

export { addPlaceCard, createPlaceCard, removeCard, toggleLike };
