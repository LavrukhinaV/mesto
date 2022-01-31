const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const buttonOpenPopupEditProfile = document.querySelector('.profile__button-edit');
const buttonOpenPopupAddElement = document.querySelector('.profile__button-add');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddElement = document.querySelector('.popup_add_element')
const popupCard = document.querySelector('.popup_card');
const buttonClosePopupEditProfile = document.querySelector('.popup__close-btn_edit-profile');
const buttonClosePopupAddElement = document.querySelector('.popup__close-btn_add-element');
const buttonClosePopupCard = document.querySelector('.popup__close-btn_card');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const inputName = document.querySelector('.input__text_type_name');
const inputJob = document.querySelector('.input__text_type_job');
const inputTitle = document.querySelector('.input__text_type_title');
const inputLink = document.querySelector('.input__text_type_link');
const buttonInputEditProfile = document.querySelector('.input_edit-profile');
const buttonInputAddElement = document.querySelector('.input_add-name');
const elementsList = document.querySelector('.elements');
const elementsTemplate = document.querySelector('.elements-template').content;
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

let cardElement

// функция создания карточки и добавления слушателей
function createElement(element) {
  cardElement = elementsTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__title').textContent = element.name;
  cardElement.querySelector('.element__image').src = element.link;
  
  addListeners(cardElement);
  return cardElement;
};

// Функция добавления обработчиков
function addListeners(el) {
  el.querySelector('.element__button-delete').addEventListener('click', deleteCard);
  el.querySelector('.element__button-like').addEventListener('click', likeCard);
  el.querySelector('.element__image').addEventListener('click', openPopupCard);
}

// Функция добавления карточек в разметку
function render() {
  initialCards.forEach((element) => {
    elementsList.append(createElement(element))
  })
  }

// Функция удаления карточки
function deleteCard(event) {
  event.target.closest('.element').remove();
}

//Функция поставить лайк карточке
function likeCard(event) {
  event.target.classList.toggle('element__button-like_active');
}

//Функция открытия попапа карточки
function openPopupCard(event) {
  popupCard.classList.add('popup_opened');
  popupImage.src = event.target.closest('.element').querySelector('.element__image').src;
  popupCaption.textContent = event.target.closest('.element').querySelector('.element__title').textContent;
};

// Функция добавления новой карточки
function addItem(evt) {
  evt.preventDefault();
  elementsList.append(createElement(cardElement));

  cardElement.querySelector('.element__title').textContent = inputTitle.value;
  cardElement.querySelector('.element__image').src = inputLink.value;

  resetForm ();
  closePopupAddElement();
}

//Функция очистки формы попапа с добавлением новой карточки
function resetForm () {
  inputTitle.value = '';
  inputLink.value = '';
}

// Функция открытия попапа изменения профиля
function openPopupEditProfile() {
  popupEditProfile.classList.add('popup_opened');
  inputName.value = nameProfile.textContent;
  inputJob.value = jobProfile.textContent;
}

// Функция закрытия попапа изменения профиля
function closePopupEditProfile() {
  popupEditProfile.classList.remove('popup_opened');
}

// Функция отправки формы изменения профиля
function submitFormEditProfile(evt) {
  evt.preventDefault();
  nameProfile.textContent = inputName.value;
  jobProfile.textContent = inputJob.value;
  closePopupEditProfile();
}

// Функция открытия попапа добавления изображения
function openPopupAddElement() {
  popupAddElement.classList.add('popup_opened');
}

// Функция закрытия попапа добавления изображения
function closePopupAddElement() {
  popupAddElement.classList.remove('popup_opened');
}

// Функция закрытия попапа карточки
function closePopupCard() {
  popupCard.classList.remove('popup_opened');
}

buttonOpenPopupEditProfile.addEventListener('click', openPopupEditProfile);
buttonClosePopupEditProfile.addEventListener('click', closePopupEditProfile);
buttonInputEditProfile.addEventListener('submit', submitFormEditProfile);
buttonOpenPopupAddElement.addEventListener('click', openPopupAddElement);
buttonClosePopupAddElement.addEventListener('click', closePopupAddElement);
buttonClosePopupCard.addEventListener('click', closePopupCard);
buttonInputAddElement.addEventListener('submit', addItem);

render();







