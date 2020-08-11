export default class Api {
  constructor(options) {
    this._options = options;
  }

  getUserInfo() {
    return fetch(this._options.baseUrl+'users/me', {
      headers: {
        authorization: this._options.headers.authorization
      }
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

  getInitialCards() {
    return fetch(this._options.baseUrl+'cards', {
      headers: {
        authorization: this._options.headers.authorization
      }
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
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
