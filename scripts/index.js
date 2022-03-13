import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import { popupCard, popupImage, popupCaption } from './constants.js';
import { openPopup, closeByEscape } from './utils.js'

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

const validationConfig = {
  formSelector: '.input',
  inputSelector: '.input__text',
  submitButtonSelector: '.input__submit-btn',
  inactiveButtonClass: 'input__submit-btn_disabled',
  inputErrorClass: 'input__text_type_error',
}

const buttonOpenPopupEditProfile = document.querySelector('.profile__button-edit');
const buttonOpenPopupAddElement = document.querySelector('.profile__button-add');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddElement = document.querySelector('.popup_add-element')
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
const popupOverlay = Array.from(document.querySelectorAll('.popup'));
const buttonSubmitAddCardForm = document.querySelector('.input__submit-btn_type_add-name');
const editProfileForm = popupEditProfile.querySelector('.input');
const addCardForm = popupAddElement.querySelector('.input');

const editProfileValidator = new FormValidator(validationConfig, editProfileForm)
const addCardValidator = new FormValidator(validationConfig, addCardForm)

editProfileValidator.enableValidation()
addCardValidator.enableValidation()

//Функция установки значений в попап открытия картинки
const setAtributPopupCard = (name, link) => {
  popupImage.src = link;
  popupCaption.textContent = name;
  popupImage.alt = name;
  openPopup(popupCard);
}

const renderCard = (data, wrap) => {
  const cardNew = new Card(data, '.elements-template', () => setAtributPopupCard(data.name, data.link));
  const cardElement = cardNew.createElement()
  wrap.prepend(cardElement);
}

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

//Функция закрытия попапа нажатием на оверлей
function closePopupOnOverlay(evt) {
  if(evt.target === evt.currentTarget) {
    closePopup(evt.target);
   }
}

//Функция установки значений в поля ввода попапа редактирования профиля
function setValue(){
  inputName.value = nameProfile.textContent;
  inputJob.value = jobProfile.textContent;
}

//Функция редактирования полей в профиле
function editProfile(){
  nameProfile.textContent = inputName.value;
  jobProfile.textContent = inputJob.value;
}

// Функция добавления новой карточки
function submitCardForm(evt) {
  evt.preventDefault();
  renderCard({
    name: inputTitle.value,
    link: inputLink.value
  }, elementsList)
  buttonInputAddElement.reset();
  closePopup(popupAddElement);
}

// Функция отправки формы изменения профиля
function submitEditProfileForm(event) {
  submitForm(event);
  editProfile();
  closePopup(popupEditProfile);
}

// Функция отправки формы 
function submitForm(event) {
  event.preventDefault();
}

//Функция установки неактивных значений для кнопки
function disenableButton(button) {
  button.setAttribute('disabled', '');
  button.classList.add('input__submit-btn_disabled');
}

buttonOpenPopupEditProfile.addEventListener('click', function(){
  setValue();
  openPopup(popupEditProfile);
  editProfileValidator.resetErrors()
});

buttonClosePopupEditProfile.addEventListener('click',() => closePopup(popupEditProfile));

buttonOpenPopupAddElement.addEventListener('click',() => {
  openPopup(popupAddElement);
  disenableButton(buttonSubmitAddCardForm);
  addCardValidator.resetErrors()
});

buttonClosePopupAddElement.addEventListener('click', () => closePopup(popupAddElement));
buttonClosePopupCard.addEventListener('click', () => closePopup(popupCard));
buttonInputEditProfile.addEventListener('submit', submitEditProfileForm);
buttonInputAddElement.addEventListener('submit', submitCardForm);
popupOverlay.forEach((e)=>e.addEventListener('click', closePopupOnOverlay));

initialCards.forEach((data) => {
  renderCard(data, elementsList)
});





