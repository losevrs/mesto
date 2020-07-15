'use strict';

const validationSettings = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}

function showInputError(form, inputElement, errorMessage, settings) {
  const displayError = form.querySelector(`#${settings.inputSelector.slice(1)}_${inputElement.name}_error`);
  displayError.textContent = errorMessage;
  displayError.classList.add(settings.errorClass);
}

function hideInputError(form, inputElement, settings) {
  const displayError = form.querySelector(`#${settings.inputSelector.slice(1)}_${inputElement.name}_error`);
  displayError.classList.remove(settings.errorClass);
  displayError.textContent = '';
}

function checkInputValidity(form, inputElement, settings) {
  if (!inputElement.validity.valid) {
    showInputError(form, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(form, inputElement, settings);
  }
}

function isInvalidInputs (inputs) {
  return inputs.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

function toggleSubmitState (inputs, submitButton, settings) {
  if (isInvalidInputs(inputs)) {
    submitButton.classList.add(settings.inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(settings.inactiveButtonClass);
    submitButton.disabled = false;
  }
};

function setEventListeners(form, settings) {
  const inputsForm = Array.from(form.querySelectorAll(settings.inputSelector));
  const submitButton = form.querySelector(settings.submitButtonSelector);
  inputsForm.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      toggleSubmitState(inputsForm, submitButton, settings);
      checkInputValidity(form, inputElement, settings);
    });
  });
}

function enableValidation(settings) {
  const formList = document.querySelectorAll(settings.formSelector);
  formList.forEach((form) => {
    form.addEventListener('submit', (event) => {event.preventDefault();});
    setEventListeners(form, settings);
  });
}

enableValidation(validationSettings);
