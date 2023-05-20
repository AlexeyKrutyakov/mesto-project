import './index.css';

import {
  profileSection,
  cardsSection,
  validationParameters,
} from './components/commonElements.js';

import { config } from './components/api.js';

import { enableValidation } from './components/validate.js';

import { getInitialCards, getProfile } from './components/api.js';

import { clickHandler, renderProfile } from './components/utils.js';

let profileId = '';

Promise.all([getProfile()])
  .then(([json]) => {
    profileId = json._id;
    renderProfile(json);
  })
  .catch(([getProfileErr]) => {
    console.log('Error: ', getProfileErr);
  });

// getInitialCards(config);

// add listeners
profileSection.addEventListener('click', clickHandler);
cardsSection.addEventListener('click', clickHandler);

// enable forms validation
enableValidation(validationParameters);

export { profileId };
