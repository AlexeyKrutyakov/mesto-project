import { formSelectors } from './constants.js';

// Отрисовка сообщения о процессе загрузки
export const renderLoading = (
  isLoading,
  formElement,
  loadingValue,
  baseValue
) => {
  const buttonElement = formElement.querySelector(
    formSelectors.submitBtnSelector
  );
  if (isLoading) {
    buttonElement.textContent = loadingValue;
  } else {
    buttonElement.textContent = baseValue;
  }
};

export const showError = (err) => {
  console.log('Error: ', err);
};
