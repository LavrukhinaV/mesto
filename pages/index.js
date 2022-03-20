import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { nameProfile, jobProfile } from '../components/constants.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js'
import { PopupWithForm } from '../components/PopupWithForm.js'

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
const buttonInputEditProfile = document.querySelector('.input_edit-profile');
const buttonInputAddElement = document.querySelector('.input_add-name');
const elementsList = '.elements';
const popupCardSelector = document.querySelector('.popup_card')

const popupRedactProfile = new UserInfo({
  userNameSelector: nameProfile, 
  userProfessionSelector: jobProfile
}, popupEditProfile);

const popupEditProfileSubmit = new PopupWithForm({
  popupSelector: popupEditProfile,
  submitCardForm: (formData) => {
    popupRedactProfile.setUserInfo(formData);
    popupEditProfileSubmit.close()
  }
});

const popupAddElementSubmit = new PopupWithForm({
  popupSelector: popupAddElement,
  submitCardForm: (formData) => {
    const newCard = new Section({
      items: [{
        name: formData.title, 
        link: formData.link
    }],
      renderer: (item) => {
        const card = new Card(item, '.elements-template', () => handleCardClick(item.name, item.link));
        const cardElement = card.createElement()
        newCard.addItem(cardElement);
      },
    },
  elementsList);

  newCard.renderer();

  popupAddCard.close()
  }
});

const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.elements-template', () => handleCardClick(item.name, item.link));
    const cardElement = card.createElement()
    
    defaultCardList.addItem(cardElement);
  },
},
elementsList);

const formValidators = {}

// Включение валидации
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement)
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')

   // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

//Функция установки значений в попап открытия картинки
function handleCardClick (name, link) {
  const popupWithImageCard = new PopupWithImage({
    data: {
      name, 
      link
  }}, popupCardSelector);
  popupWithImageCard.open()
  popupWithImageCard.setEventListeners()
}

//Функция установки значений в поля ввода попапа редактирования профиля
function setValue(){
  popupRedactProfile.open();
  popupRedactProfile.getUserInfo();
}

buttonOpenPopupEditProfile.addEventListener('click', function(){
  formValidators['profile-form'].resetErrors();
  setValue();
  formValidators['profile-form'].checkButtonValidity();  
});

buttonOpenPopupAddElement.addEventListener('click',() => {
  popupAddElementSubmit.open()
  formValidators['add-card'].resetErrors();
});

buttonInputEditProfile.addEventListener('submit', popupEditProfileSubmit.setEventListeners());
buttonInputAddElement.addEventListener('submit', popupAddElementSubmit.setEventListeners());

defaultCardList.renderer()



