import './index.css';

import * as elements from './components/commonElements.js';

import { initialCards } from './components/data.js';

import { enableFormValidation } from './components/validate.js';

import { addPlaceCard } from './components/card.js';

import { clickHandler, keydownHandler } from './components/utils.js';

const profileSection = document.querySelector('.profile');
const formsList = Array.from(document.forms);
const page = document.querySelector('.page');

// initialize place cards
initialCards.forEach((place) => {
  addPlaceCard(place.name, place.link, place.alt);
});

// add listeners
profileSection.addEventListener('click', clickHandler);
elements.cardsSection.addEventListener('click', clickHandler);
page.addEventListener('keydown', keydownHandler);

// enable forms validation
formsList.forEach((form) => enableFormValidation(form));

// to-do:
// remove all non-working listeners (how to?)
