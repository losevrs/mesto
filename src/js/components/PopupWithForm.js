'use strict';

import Popup from './Popup.js';
import FormValidator from './FormValidator.js';
import {validationSettings} from '../initdata.js';

export default class PopupWithForm extends Popup {
  constructor (popupSelector, onSubmit, inputSelector = '.popup__input', formSelecor = '.popup__container') {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(formSelecor);
    this._inputSelector = inputSelector;
    this._inputs = Array.from(this._popupForm.querySelectorAll(inputSelector));
    this._submit = onSubmit;
    this._submitButton = this._popupForm.querySelector('.popup__submit') || null;
    this._validationObject = new FormValidator(validationSettings, this._popupElement);
    this._validationObject.enableValidation();
  }

  _submitButtonSwitch(on = true) {
    if (this._submitButton) {
        this._submitButton.disabled = !on;
    }
  }

  _setEventListeners() {
    super._setEventListeners();
    this._popupForm.addEventListener('submit', (event) => this._submit(event));
  }

  setInputValues(inputValues) {
    let i = 0;
    this._inputs.forEach((inputElement) => {
      if (i < inputValues.length) {
        inputElement.value = inputValues[i];
        i++;
      } else {
        inputElement.value = '';
      }
    });
  }

  getInputValues() {
    const returnInputValues = [];
    this._inputs.forEach((inputElement) => {
      returnInputValues[inputElement.name] = inputElement.value;
    });
    return returnInputValues;
  }

  _getInputByName(name) {
    return this._inputs.find((element) => {
      return (element.name === name) ? true : false;
    });
  }

  getInputValueByName(name) {
    const input = this._getInputByName(name);
    return (input) ? input.value : null;
  }

  setInputValueByName(name, value) {
    const input = this._getInputByName(name);
    if (input) {
      input.value = value;
    }
  }

  attachValidationObject(validationObject) {
    this._validationObject = validationObject;
  }

  open() {
    if (this._validationObject) {
      this._validationObject.clearPopupForm();
    }
    super.open();
  }

  close() {
    this._popupForm.reset();

    this._submitButtonSwitch(false); // Иначе срабатывает двойной Enter как два сабмита из за
                                     // плавного закрытия - 0.2s
    super.close();
  }

}
