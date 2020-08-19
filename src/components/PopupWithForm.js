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

  _submitButtonSwitch(on = true) {
    if (this._submitButton) {
      this._submitButton.disabled = !on;
    }
  }

  _setEventListeners() {
    super._setEventListeners();
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

  // Функции могут быть полезны при возникновении необходимости работать с каким либо
  // инпутом по имени отдельно.
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

  close() {
    this._popupForm.reset();
    this._submitButtonSwitch(false); // Иначе срабатывает двойной Enter как два сабмита из за
    // плавного закрытия - 0.2s
    super.close();
    this._submitButton.textContent = 'Сохранить';
  }

}
