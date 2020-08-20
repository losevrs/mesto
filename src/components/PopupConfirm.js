import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(popupSelector, onSubmit, formSelecor = '.popup__container') {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(formSelecor);
    this._submit = onSubmit;
    this._submitButton = this._popupForm.querySelector('.popup__submit') || null;
    this.popupReferer = null;
    this._submitButton.textContent = 'Да';
    this._handleOnEnterSubmit = this._handleOnEnterSubmit.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._submitOn = true;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._handleSubmit);
  }

  // Методы для возможности установить элемент вызвавший попуп.
  setReferer(referer) {
    this.popupReferer = referer;
  }

  getReferer() {
    return this.popupReferer;
  }

  _handleSubmit(event) {
    event.preventDefault();
    if (this._submitOn) {
      //Так как форма без валидации, двойное срабатывание сабмита
      //разрулим флагом. Иначе дабл-клик и двойной быстрый Enter
      //дают два сабмита.
      this._submitOn = false;
      this._submitButton.textContent = 'Удаление...';
      this._submit();
    }
  }

  // Так как инпутов нет - добавляем сами
  _handleOnEnterSubmit(event) {
    if (event.key === 'Enter') {
      this._handleSubmit(event);
    }
  }

  open() {
    super.open();
    this._submitOn = true;
    document.addEventListener('keydown', this._handleOnEnterSubmit);
  }

  close() {
    super.close();
    document.removeEventListener('keydown', this._handleOnEnterSubmit);
    this._submitButton.textContent = 'Да';
  }

}
