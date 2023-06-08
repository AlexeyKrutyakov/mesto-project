export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  getProfile() {
    const url = `${this._baseUrl}/users/me`;
    const requestOptions = {
      method: 'GET',
      headers: this._headers,
    };
    return fetch(url, requestOptions).then((res) => {
      return this._getResponseData(res);
    });
  }

  getInitialCards() {
    const url = `${this._baseUrl}/cards`;
    const requestOptions = {
      method: 'GET',
      headers: this._headers,
    };
    return fetch(url, requestOptions).then((res) => {
      return this._getResponseData(res);
    });
  }

  patchAvatar(link) {
    const url = `${this._baseUrl}/users/me/avatar`;
    const requestOptions = {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    };
    return fetch(url, requestOptions).then((res) => {
      return this._getResponseData(res);
    });
  }

  patchProfile([profileName, profileAbout]) {
    const url = `${this._baseUrl}/users/me`;
    const requestOptions = {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: profileName,
        about: profileAbout,
      }),
    };
    return fetch(url, requestOptions).then((res) => {
      return this._getResponseData(res);
    });
  }

  postCard([placeName, placeImage]) {
    const url = `${this._baseUrl}/cards`;
    const requestOptions = {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: placeName,
        link: placeImage,
      }),
    };
    return fetch(url, requestOptions).then((res) => {
      return this._getResponseData(res);
    });
  }

  deleteCard(cardId) {
    const url = `${this._baseUrl}/cards/${cardId}`;
    const requestOptions = {
      method: 'DELETE',
      headers: this._headers,
    };
    return fetch(url, requestOptions).then((res) => {
      return this._getResponseData(res);
    });
  }

  putLike(cardId) {
    const url = `${this._baseUrl}/cards/likes/${cardId}`;
    const requestOptions = {
      method: 'PUT',
      headers: this._headers,
    };
    return fetch(url, requestOptions).then((res) => {
      return this._getResponseData(res);
    });
  }

  deleteLike(cardId) {
    const url = `${this._baseUrl}/cards/likes/${cardId}`;
    const requestOptions = {
      method: 'DELETE',
      headers: this._headers,
    };
    return fetch(url, requestOptions).then((res) => {
      return this._getResponseData(res);
    });
  }
}
