import './index.css';

import {
  profileSection,
  cardsSection,
  validationParameters,
} from './components/commonElements.js';

import { config } from './components/api.js';

import { enableValidation } from './components/validate.js';

import { getInitialCards, getProfileInfo } from './components/api.js';

import { clickHandler } from './components/utils.js';

let profileId = '';

getProfileInfo(config);

getInitialCards(config);

// add listeners
profileSection.addEventListener('click', clickHandler);
cardsSection.addEventListener('click', clickHandler);

// enable forms validation
enableValidation(validationParameters);

export { profileId };
