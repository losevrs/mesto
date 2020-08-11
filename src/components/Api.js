export default class Api {
  constructor(options) {
    this._options = options;
  }

  serverRequest(urlSuffix, method = 'GET', body = undefined) {
    return fetch(this._options.baseUrl+urlSuffix, {
      method: method,
      headers: {
        authorization: this._options.headers.authorization
      },
      body: body
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

  getUserInfo() {
    return this.serverRequest('users/me');
  }

  getInitialCards() {
    return this.serverRequest('cards');
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12/',
  headers: {
    authorization: 'd6770652-b28e-4007-834e-116536b370da',
    'Content-Type': 'application/json'
  }
});

export {api}
