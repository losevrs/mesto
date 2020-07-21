'use strict'

export default class Card {
  constructor (initialData, templateSelector) {
    const template = document.querySelector(templateSelector);
    if (template) {
      this.elementCard = template.content.cloneNode(true);

      this.viewPort = this.elementCard.querySelector('.photocard__viewport');
      this.viewPort.src = initialData.link;
      this.viewPort.alt = initialData.name;
      this.viewPort.onerror = this._onErrorLoadImage;

      const deleteButton = this.elementCard.querySelector('.photocard__delete');
      this.deleteHandler = this._deleteCard.bind(this);
      deleteButton.addEventListener('click', this.deleteHandler);

      const cardPlaceName = this.elementCard.querySelector('.photocard__placename');
      cardPlaceName.textContent = initialData.name;

      const likeButton = this.elementCard.querySelector('.photocard__like');
      likeButton.addEventListener('click', this._toggleLike);

      this.showHandler = null;
    }
    else {
      console.log('Не обнаружен шаблон карточки.');
    }

  }

  // Получить элемент карточки (на вход хандлер открытие попапа для просмотра - если нужно)
  getCard (viewPortShowHandler = null) {
    if (viewPortShowHandler) {
      this.showHandler = viewPortShowHandler;
      this.viewPort.addEventListener('click', viewPortShowHandler);
    }
    return this.elementCard;
  }

  _deleteCardListeners(elementCard) {
    if (this.showHandler) {
      elementCard.querySelector('.photocard__viewport').removeEventListener('click', this.showHandler);
    }
    elementCard.querySelector('.photocard__delete').removeEventListener('click', this.deleteHandler);
    elementCard.querySelector('.photocard__like').removeEventListener('click', this._toggleLike);
  }

  // Удаляем себя
  _deleteCard (event) {
    const card = event.currentTarget.closest('.photocard');
    this._deleteCardListeners(card);
    event.stopPropagation();
    card.remove();
  }

  // Если не загрузится картинка
  _onErrorLoadImage (event) {
    event.target.src = './images/placesphotos/onerror.jpg';
  }

  // Обработка лайка
  _toggleLike (event) {
    event.target.classList.toggle('photocard__like_on');
    event.stopPropagation();
  }

}
