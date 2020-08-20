import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, onSubmit, inputSelector = '.popup__input', formSelecor = '.popup__container') {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(formSelecor);
    this._inputSelector = inputSelector;
    this._inputs = Array.from(this._popupForm.querySelectorAll(inputSelector));
    this._submit = onSubmit;
    this._submitButton = this._popupForm.querySelector('.popup__submit') || null;
    this._submitButton.textContent = 'Сохранить';
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitButton.textContent = 'Сохранение...';
      this._submit(this._getInputValues());
    });
  }

  // Инициализирует значения инпутов из входного массива значений при необходимости
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

  // Возвращает значения инпутов в формате - имя_инпута : значение_инпута
  _getInputValues() {
    const returnInputValues = {};
    this._inputs.forEach((inputElement) => {
      returnInputValues[inputElement.name] = inputElement.value;
    });
    return returnInputValues;
  }

  close() {
    this._popupForm.reset();
    super.close();
    this._submitButton.textContent = 'Сохранить';
  }

}
