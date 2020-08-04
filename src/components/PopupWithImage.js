import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._popupView = document.querySelector(popupSelector);
    this._popupViewImage = this._popupView.querySelector('.popup__image');
    this._popupViewImageTitle = this._popupView.querySelector('.popup__imagetitle');
  }

  open(photoData) {
    this._popupViewImage.src = photoData.src;
    this._popupViewImageTitle.textContent = photoData.alt;
    super.open();
  }
}
