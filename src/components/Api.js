const customFetch = (url, options = {}) => {
  return fetch(url, options)
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    .catch((err) => {
      console.log(err);
    });
}

class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers
    this._baseUrl = baseUrl
  }

  getProfile() {
    return customFetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
  }

  getInitialCards() {
    return customFetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
  }

  editProfile(newInfo) {
    return customFetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(newInfo)
    })
  }

  editAvatar(avatar) {
    return customFetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar)
    })
  }

  addCard(data) {
    return customFetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data)
    })
  }

  deleteCard(id) {
    return customFetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
  }

  deleteLike(id) {
    return customFetch(`${this._baseUrl}/cards/${id}/likes`,{
      method: "DELETE",
      headers: this._headers,
    })
  }

  addLike(id) {
    return customFetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: 'ee93647a-9e52-4a5c-8c91-f4f8769c1111',
    'Content-Type': 'application/json'
  }
}); 