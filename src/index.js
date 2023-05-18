import './index.css';

import {
  cardsSection,
  validationParameters,
} from './components/commonElements.js';

import { serverUrl, token } from './components/data';

import { enableValidation } from './components/validate.js';

import { getCards } from './components/api.js';

import { clickHandler, refreshProfile } from './components/utils.js';

const profileSection = document.querySelector('.profile');
const page = document.querySelector('.page');

refreshProfile();

getCards(serverUrl, {
  headers: {
    authorization: token,
  },
});

// add listeners
profileSection.addEventListener('click', clickHandler);
cardsSection.addEventListener('click', clickHandler);

// enable forms validation
enableValidation(validationParameters);
