import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor (popupSelector, popupBodySelector) {
    super(popupSelector);
    this._popupBody = this._popupElement.querySelector(popupBodySelector);
    this.popupReferer = null;
    this._actionButton = this._popupBody.querySelector('.popup__submit') || null;
    this.onEnter = () => {this._handlePressEnter(event);}
  }

  // Методы для возможности установить элемент вызвавший попуп.
  setReferer (referer) {
    this.popupReferer = referer;
  }

  getReferer () {
    return this.popupReferer;
  }

  setActionOnYes (action) {
    this._action = action;
  }

  _submitButtonSwitch(on = true) {
    if (this._submitButton) {
        this._submitButton.disabled = !on;
    }
  }

  _setEventListeners() {
    super._setEventListeners();
    this._actionButton.addEventListener('click', (event) => {
      if (this._action) {
        this._action(event);
      }
    });
  }

  _handlePressEnter(event) {
    if (event.key === 'Enter') {
      if (this._action) {
        this._action(event);
      }
      this.close();
    }
  }

  open() {
    super.open();
    document.addEventListener('keydown', this.onEnter);
  }

  close() {
    this._submitButtonSwitch(false); // Иначе срабатывает двойной Enter как два сабмита из за
                                     // плавного закрытия - 0.2s
    super.close();
    document.removeEventListener('keydown', this.onEnter);
  }

}
