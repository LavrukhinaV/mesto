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

const openPopupButtonEditProfile = document.querySelector('.profile__button-edit');
const openPopupAddElementButton = document.querySelector('.profile__button-add');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddElement = document.querySelector('.popup_add_element')
const popupCard = document.querySelector('.popup_card');
const closePopupButton = document.querySelector('.popup__close-btn');
const closePopupAddElementButton = document.querySelector('.close-popup-add-element');
const closePopupCardButton = document.querySelector('.close-popup-card');
const nameInput = document.querySelector('.profile__name');
const jobInput = document.querySelector('.profile__job');
const inputName = document.querySelector('.input__text_type_name');
const inputJob = document.querySelector('.input__text_type_job');
const inputTitle = document.querySelector('.input__text_type_title');
const inputLink = document.querySelector('.input__text_type_link');
const inputPopupButton = document.querySelector('.input');
const inputPopupButtonAddElement = document.querySelector('.input-add-name');
const elementsList = document.querySelector('.elements');
const elementsTemplate = document.querySelector('.elements-template').content;

function render() {
  initialCards.forEach(renderItem);
};

function renderItem(element) {
  const cardElement = elementsTemplate.cloneNode(true);
  cardElement.querySelector('.element__title').textContent = element.name;
  cardElement.querySelector('.element__image').src = element.link;
  
  addListeners(cardElement);

  cardElement.querySelector('.element__button-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button-like_active');
  });
  

  cardElement.querySelector('.element__image').addEventListener('click', function (evt) {
    popupCard.classList.add('popup_opened');
    let popupImage = document.querySelector('.popup__image');
    let popupCaption = document.querySelector('.popup__caption');
    popupImage.src = element.link;
    popupCaption.textContent = element.name;
  });

  elementsList.appendChild(cardElement);
};

function addListeners(el) {
  el.querySelector('.element__button-delete').addEventListener('click', cardDelete);
}

// Функция удаления карточки
function cardDelete(event) {
  event.target.closest('.element').remove();
}

function addItem(evt) {
  evt.preventDefault();
  const cardElement = elementsTemplate.cloneNode(true);
  cardElement.querySelector('.element__title').textContent = inputTitle.value;
  cardElement.querySelector('.element__image').src = inputLink.value;
  
  addListeners(cardElement);
  cardElement.querySelector('.element__button-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button-like_active');
  });

  cardElement.querySelector('.element__image').addEventListener('click', function () {
    popupCard.classList.add('popup_opened');
  });

  elementsList.appendChild(cardElement);
  closePopupAddElement();
}

// Функция открытия попапа изменения профиля
function openPopupEditProfile() {
  popupEditProfile.classList.add('popup_opened');
  inputName.value = nameInput.textContent;
  inputJob.value = jobInput.textContent;
}

// Функция закрытия попапа изменения профиля
function closePopupEditProfile() {
  popupEditProfile.classList.remove('popup_opened');
}

// Функция отправки формы изменения профиля
function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInput.textContent = inputName.value;
  jobInput.textContent = inputJob.value;
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

// Функция закрытия попапа добавления изображения
function closePopupCard() {
  popupCard.classList.remove('popup_opened');
}


openPopupButtonEditProfile.addEventListener('click', openPopupEditProfile);
closePopupButton.addEventListener('click', closePopupEditProfile);
inputPopupButton.addEventListener('submit', formSubmitHandler);
openPopupAddElementButton.addEventListener('click', openPopupAddElement);
closePopupAddElementButton.addEventListener('click', closePopupAddElement);
closePopupCardButton.addEventListener('click', closePopupCard);
inputPopupButtonAddElement.addEventListener('submit', addItem);



render();
console.log(initialCards.length);






