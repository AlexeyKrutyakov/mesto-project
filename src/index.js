import './index.css';

import {
  cardsSection,
  validationParameters,
} from './components/commonElements.js';

import { config } from './components/api.js';

import { enableValidation } from './components/validate.js';

import { getCards, getProfileInfo } from './components/api.js';

import { clickHandler } from './components/utils.js';

const profileSection = document.querySelector('.profile');

getProfileInfo(config);

getCards(config);

// add listeners
profileSection.addEventListener('click', clickHandler);
cardsSection.addEventListener('click', clickHandler);

// enable forms validation
enableValidation(validationParameters);
