export default class Popup {
  constructor(popupSelector, openedPopupClass = 'popup_opened') {
    this._popupSelector = popupSelector;
    this._openedPopupClass = openedPopupClass;
    this._popupElement = document.querySelector(this._popupSelector);
    this._closeOnEsc = this._handleEscClose.bind(this);
    this._targetsForClose = ['popup', 'popup__reset'];
  }

  open() {
    if (!this._popupElement.classList.contains(this._openedPopupClass)) {
      this._popupElement.classList.add(this._openedPopupClass);
    }
    document.addEventListener('keydown', this._closeOnEsc);
  }

  close() {
    if (this._popupElement.classList.contains(this._openedPopupClass)) {
      this._popupElement.classList.remove(this._openedPopupClass);
    }
    document.removeEventListener('keydown', this._closeOnEsc);
  }

  // Возвращает сам элемент popup-а для, например, привязки к валидатору.
  getPopup() {
    return this._popupElement;
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _closeOnMouseDownHandler(event) {
    const yesClose = this._targetsForClose.some((element) => {
      return event.target.classList.contains(element);
    });
    if (yesClose) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener('mousedown', this._closeOnMouseDownHandler.bind(this));
  }

}
