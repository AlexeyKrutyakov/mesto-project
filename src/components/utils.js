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
    buttonElement.value = loadingValue;
  } else {
    buttonElement.value = baseValue;
  }
};

export const inactivateSubmitBtn = (btn) => {
  btn.classList.add(formSelectors.inactiveBtnClass);
  btn.setAttribute('disabled', true);
};

export const activateSubmitBtn = (btn) => {
  btn.classList.remove(formSelectors.inactiveBtnClass);
  btn.removeAttribute('disabled');
};
