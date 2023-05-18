import { cardsSection } from './commonElements.js';

const cardTemplate = document.querySelector('#card-template').content;
const classActiveLikeBtn = 'card__like-button_active';

function addPlaceCard(placeName, placeImage, nonRemovable, imageAlt = '') {
  const newCard = createPlaceCard(
    placeName,
    placeImage,
    nonRemovable,
    imageAlt
  );
  cardsSection.prepend(newCard);
}

function createPlaceCard(placeName, placeImage, nonRemovable, imageAlt = '') {
  // copy of template element
  const placeCard = cardTemplate.querySelector('.card').cloneNode(true);
  // elements of card
  const cardName = placeCard.querySelector('.card__name');
  const cardImage = placeCard.querySelector('.card__image');
  const cardRemoveButton = placeCard.querySelector('.card__remove-button');
  if (nonRemovable) {
    cardRemoveButton.classList.add('card__remove-button_hidden');
  }
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

function hideRemoveButton(card) {
  card.classList.add('card__remove-button_hidden');
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

export {
  addPlaceCard,
  createPlaceCard,
  hideRemoveButton,
  removeCard,
  toggleLike,
};
