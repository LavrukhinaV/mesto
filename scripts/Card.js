import { popupImage, popupCaption, popupCard } from './constants.js';
import { openPopup } from './utils.js';

export class Card {
  constructor(data, cardTemplateSelector, handleCardClick) {
    this._cardTemplate = document.querySelector(cardTemplateSelector).content;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
  }
  
  // Функция удаления карточки
  _deleteCard = () => {
    this._cardElement.remove();
  }

  //Функция поставить лайк карточке
  _likeCard = () => {
    this._likeButton.classList.toggle('element__button-like_active');
  }
  
  // Функция добавления обработчиков
  _addListeners () {
    this._likeButton = this._cardElement.querySelector('.element__button-like');
    this._likeButton.addEventListener('click', this._likeCard);
  
    this._deleteButton = this._cardElement.querySelector('.element__button-delete');
    this._deleteButton.addEventListener('click', this._deleteCard);

    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }  

  //Функция заполнения полей в карточке
  _fillCard() {
    this._cardElement.querySelector('.element__title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardElement.querySelector('.element__image').alt = this._name;
  }

  // функция создания карточки и добавления слушателей
  createElement() {
    this._cardElement = this._cardTemplate.querySelector('.element').cloneNode(true);
    this._cardImage = this._cardElement.querySelector('.element__image');
    
    this._fillCard();
  
    this._addListeners();
    return this._cardElement;
  };
}