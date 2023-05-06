import '../pages/index.css';

import * as elements from './components/elements.js';

import { initialCards } from './components/data.js';

import { enableFormValidation } from './components/validate.js';

import { addPlaceCard } from './components/card.js';

import { clickHandler, keydownHandler } from './components/utils.js';

// initialize place cards
initialCards.forEach((place) => {
  addPlaceCard(place.name, place.link, place.alt);
});

// add listeners
elements.profileSection.addEventListener('click', clickHandler);
elements.cardsSection.addEventListener('click', clickHandler);
elements.page.addEventListener('keydown', keydownHandler);

// enable forms validation
enableFormValidation(elements.formProfileInfo);
enableFormValidation(elements.formPlaceInfo);

// to-do:
// remove all non-working listeners (how to?)
