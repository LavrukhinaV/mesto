export class Card {
  constructor(data, userId, cardTemplateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._cardTemplate = document.querySelector(cardTemplateSelector).content;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._cardElement = this._cardTemplate.querySelector('.element').cloneNode(true);
    this._deleteButton = this._cardElement.querySelector('.element__button-delete');
    this._likeButton = this._cardElement.querySelector('.element__button-like');
    this._cardImage = this._cardElement.querySelector('.element__image');
    this._likeCountElement = this._cardElement.querySelector('.element__like-count');
  }
  
  // Функция удаления карточки
  deleteCard() {
    this._cardElement.remove();
  }

  //Функция поставить лайк карточке
  _setLikeCard() {
    this._likeButton.classList.add('element__button-like_active');
  }

  _deleteLikeCard() {
    this._likeButton.classList.remove('element__button-like_active');
  }

  checkLike() {
    const userHasLikeCard = this._likes.find(user => user._id === this._userId);
    return userHasLikeCard
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    
    this._likeCountElement.textContent = this._likes.length;

    if(this.checkLike()) {
      this._setLikeCard()
    } else {
      this._deleteLikeCard()
    }
  }
  
  // Функция добавления обработчиков
  _addListeners () {
    this._likeButton.addEventListener('click', () => this._handleLikeClick(this._id));
  
    this._deleteButton.addEventListener('click', () => this._handleDeleteClick(this._id));

    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }  

  //Функция заполнения полей в карточке
  _fillCard() {
    this._cardElement.querySelector('.element__title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this.setLikes(this._likes);
    
    if(this._ownerId !== this._userId) {
      this._deleteButton.style.display = 'none'
    }
  }

  // функция создания карточки и добавления слушателей
  createElement() {    
    this._fillCard();
  
    this._addListeners();
    return this._cardElement;
  };
}