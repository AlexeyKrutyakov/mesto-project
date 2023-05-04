import { initialCards } from '../src/components/data.js';

import * as elements from '../src/components/elements.js';

import { enableFormValidation } from '../src/components/validate.js';

import { addPlaceCard } from '../src/components/card.js';

import { clickHandler, keydownHandler } from '../src/components/utils.js';

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
// remove all non-working listeners
