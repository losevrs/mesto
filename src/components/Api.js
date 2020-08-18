export default class Api {
  constructor(options) {
    this._options = options;
  }

  // Запрос к серверу - по умолчанию GET
  serverRequest(urlSuffix, method = 'GET', body = undefined) {
    return fetch(this._options.baseUrl+urlSuffix, {
      method: method,
      headers: {
        authorization: this._options.headers.authorization,
        'Content-Type': this._options.headers['Content-Type']
      },
      body: JSON.stringify(body)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  // Профиль пользователя
  getUserInfo() {
    return this.serverRequest('users/me');
  }

  saveProfile(profile) {
    return this.serverRequest('users/me', 'PATCH', profile);
  }

  saveAvatar(avatar) {
    return this.serverRequest('users/me/avatar', 'PATCH', avatar);
  }

  // Инициализация карточек
  getInitialCards() {
    return this.serverRequest('cards');
  }

  saveCard(card) {
    return this.serverRequest('cards', 'POST', card);
  }

  deleteCard(cardId) {
    return this.serverRequest('cards/' + cardId, 'DELETE');
  }

  // Лайки
  likeOn(cardId) {
    return this.serverRequest('cards/likes/' + cardId, 'PUT');
  }

  likeOff(cardId) {
    return this.serverRequest('cards/likes/' + cardId, 'DELETE');
  }
}

