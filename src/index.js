import './index.css';

import { cardsSection } from './components/commonElements.js';

import { initialCards } from './components/data.js';

import { enableValidation } from './components/validate.js';

import { addPlaceCard } from './components/card.js';

import { clickHandler } from './components/utils.js';

const profileSection = document.querySelector('.profile');
const page = document.querySelector('.page');

// initialize place cards
initialCards.forEach((place) => {
  addPlaceCard(place.name, place.link, place.alt);
});

// add listeners
profileSection.addEventListener('click', clickHandler);
cardsSection.addEventListener('click', clickHandler);

// enable forms validation
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveBtnClass: 'form__submit_inactive',
});
