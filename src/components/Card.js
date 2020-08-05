export default class Card {
  constructor (initialData, templateSelector, viewPortShowHandler = null) {
    this._template = document.querySelector(templateSelector);

    if (viewPortShowHandler) {
      this._showHandler = () => viewPortShowHandler(this._getViewportDescription());
    } else {
      this._showHandler = null;
    }

    this._deleteHandler = this._deleteCard.bind(this);
    this._initialData = initialData;
  }

  _setCardElements(template) {
    if (template) {
      this.elementCard = template.content.cloneNode(true);

      this.viewPort = this.elementCard.querySelector('.photocard__viewport');
      this.viewPort.src = this._initialData.link;
      this.viewPort.alt = this._initialData.name;
      this.viewPort.onerror = this._onErrorLoadImage;
      if (this._showHandler) {
        this.viewPort.addEventListener('click', this._showHandler);
      }

      const deleteButton = this.elementCard.querySelector('.photocard__delete');
      deleteButton.addEventListener('click', this._deleteHandler);

      const cardPlaceName = this.elementCard.querySelector('.photocard__placename');
      cardPlaceName.textContent = this._initialData.name;

      const likeButton = this.elementCard.querySelector('.photocard__like');
      likeButton.addEventListener('click', this._toggleLike);

    }
    else {
      console.log('Не обнаружен шаблон карточки.');
    }
  }

  // Возвращает описание карточки для просмотра
  _getViewportDescription()
  {
    return {
      srcViewport: this.viewPort.src,
      altViewport: this.viewPort.alt
    }
  }

  // Получить элемент карточки (на вход хандлер открытие попапа для просмотра - если нужно)
  getCard () {
    this._setCardElements(this._template);
    return this.elementCard;
  }

  _deleteCardListeners(elementCard) {
    if (this._showHandler) {
      elementCard.querySelector('.photocard__viewport').removeEventListener('click', this._showHandler);
    }
    elementCard.querySelector('.photocard__delete').removeEventListener('click', this._deleteHandler);
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
    //this.viewPort.onerror = null;
    event.target.src = './images/placesphotos/onerror.jpg';
  }

  // Обработка лайка
  _toggleLike (event) {
    event.target.classList.toggle('photocard__like_on');
    event.stopPropagation();
  }

}
