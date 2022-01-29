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
const closePopupButton = document.querySelector('.popup__close-btn');
const closePopupAddElementButton = document.querySelector('.close-popup-add-element')
const nameInput = document.querySelector('.profile__name');
const jobInput = document.querySelector('.profile__job');
const inputName = document.querySelector('.input__text_type_name');
const inputJob = document.querySelector('.input__text_type_job');
const inputTitle = document.querySelector('.input__text_type_title');
const inputLink = document.querySelector('.input__text_type_link');
const inputPopupButton = document.querySelector('.input');
const inputPopupButtonAddElement = document.querySelector('.input-add-name');
// const deleteCardButton = document.querySelector('.element__button-delete');



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
  
  elementsList.appendChild(cardElement);
  
};

function addListeners(el) {
  el.querySelector('.element__button-delete').addEventListener('click', cardDelete);
}

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

  elementsList.appendChild(cardElement);
  closePopupAddElement();
}

// initialCards.push({
//   name: 'Байкал',
//   link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
// });

// initialCards.forEach(function (element) {
//   const cardElement = elementsTemplate.cloneNode(true);
//   cardElement.querySelector('.element__title').textContent = element.name;
//   cardElement.querySelector('.element__image').src = element.link;

//   elementsList.append(cardElement);
// });

function openPopupEditProfile() {
  popupEditProfile.classList.add('popup_opened');
  inputName.value = nameInput.textContent;
  inputJob.value = jobInput.textContent;
}

function closePopupEditProfile() {
  popupEditProfile.classList.remove('popup_opened');
}

function openPopupAddElement() {
  popupAddElement.classList.add('popup_opened');
}

function closePopupAddElement() {
  popupAddElement.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInput.textContent = inputName.value;
  jobInput.textContent = inputJob.value;
  closePopupEditProfile();
}




openPopupButtonEditProfile.addEventListener('click', openPopupEditProfile);
openPopupAddElementButton.addEventListener('click', openPopupAddElement);
closePopupButton.addEventListener('click', closePopupEditProfile);
closePopupAddElementButton.addEventListener('click', closePopupAddElement);
inputPopupButton.addEventListener('submit', formSubmitHandler);
inputPopupButtonAddElement.addEventListener('submit', addItem);


render();
console.log(initialCards.length);

// deleteCardButton.addEventListener('click', function () {
//   const card = document.querySelectorAll('.element');
//   for (let i = 0; i < card.length; i++) {
//     card[i].remove();
//   }
  
// });





