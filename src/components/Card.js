import onErrorImage from '../images/placesphotos/onerror.jpg';
import { api } from '../components/Api.js'

export default class Card {
  constructor(initialData, templateSelector, myId, popupConfirm, viewPortShowHandler = null, likeAktion = null) {
    this._template = document.querySelector(templateSelector);

    viewPortShowHandler ? this._showHandler =
      () => viewPortShowHandler(this._getViewportDescription())
      : this._showHandler = null;

    this._initialData = initialData;

    this._myId = myId;
    this._canAddDelete = this._initialData.owner._id === this._myId;

    this._likeCount = this._initialData.likes.length;
    this._likeShow = this._initialData.likes.some((item) => { return item._id === this._myId; });

    this._popupConfirm = popupConfirm;

    likeAktion ? this._likeAction = (cardId, likeOn) => likeAktion(cardId, likeOn) : this._likeAction = null;
  }

  _setCardElements(template) {
    if (template) {
      this.elementCard = template.content.cloneNode(true);

      this.elementCard.querySelector('.photocard').setAttribute('data-id', this._initialData._id);

      this.viewPort = this.elementCard.querySelector('.photocard__viewport');
      this.viewPort.src = this._initialData.link;
      this.viewPort.alt = this._initialData.name;
      this.viewPort.onerror = this._onErrorLoadImage;
      if (this._showHandler) {
        this.viewPort.addEventListener('click', this._showHandler);
      }

      this.elementCard.querySelector('.photocard__count').textContent = this._likeCount;

      if (this._canAddDelete) {
        const deleteButton = this.elementCard.querySelector('.photocard__delete');
        deleteButton.classList.add('photocard__delete_show');
        deleteButton.addEventListener('click', (event) => {
          this._popupConfirm.setReferer(event.target.closest('.photocard'));
          this._popupConfirm.open();
        });
      }

      const cardPlaceName = this.elementCard.querySelector('.photocard__placename');
      cardPlaceName.textContent = this._initialData.name;

      const likeButton = this.elementCard.querySelector('.photocard__like');
      likeButton.addEventListener('click', this._toggleLike.bind(this));
      if (this._likeShow) {
        likeButton.classList.add('photocard__like_on');
      }

    }
    else {
      console.log('Не обнаружен шаблон карточки.');
    }
  }

  // Возвращает описание карточки для просмотра
  _getViewportDescription() {
    return {
      srcViewport: this.viewPort.src,
      altViewport: this.viewPort.alt
    }
  }

  // Получить элемент карточки (на вход хандлер открытие попапа для просмотра - если нужно)
  getCard() {
    this._setCardElements(this._template);
    return this.elementCard;
  }

  // Если не загрузится картинка
  _onErrorLoadImage(event) {
    event.target.src = onErrorImage;
  }

  // Обработка лайка
  _toggleLike(event) {
    const card = event.target.closest('.photocard');
    const cardId = card.getAttribute('data-id');
    const likeCount = card.querySelector('.photocard__count');

    const likeOn = !event.target.classList.contains('photocard__like_on');
    this._likeAction(cardId, likeOn)
      .then((data) => {
        if (data) {
          likeCount.textContent = data.likes.length;
          likeOn ? event.target.classList.add('photocard__like_on')
            : event.target.classList.remove('photocard__like_on');
        }
      });

    event.stopPropagation();
  }

}
