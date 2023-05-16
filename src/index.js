import './index.css';

import {
  cardsSection,
  validationParameters,
} from './components/commonElements.js';

// import { initialCards } from './components/data.js';

import { enableValidation } from './components/validate.js';

import { getCards, addPlaceCard } from './components/card.js';

import { clickHandler } from './components/utils.js';

const profileSection = document.querySelector('.profile');
const page = document.querySelector('.page');

getCards('https://nomoreparties.co/v1/plus-cohort-24/cards', {
  headers: {
    authorization: '9e2d263a-3d5a-40f2-a16e-27e8711676de',
  },
});

// add listeners
profileSection.addEventListener('click', clickHandler);
cardsSection.addEventListener('click', clickHandler);

// enable forms validation
enableValidation(validationParameters);
