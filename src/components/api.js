export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResult(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => {
      return this._checkResult(res);
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => {
      return this._checkResult(res);
    });
  }

  patchProfile([name, about]) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      return this._checkResult(res);
    });
  }

  patchAvatar([link]) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => {
      return this._checkResult(res);
    });
  }

  postCard([cardName, cardLink]) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      }),
    }).then((res) => {
      return this._checkResult(res);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      return this._checkResult(res);
    });
  }

  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}/`, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => {
      return this._checkResult(res);
    });
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}/`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      return this._checkResult(res);
    });
  }
}
