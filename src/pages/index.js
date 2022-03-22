import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { initialCards, validationConfig, buttonOpenPopupEditProfile, buttonOpenPopupAddElement, 
  popupEditProfile, popupAddElement, buttonInputEditProfile, buttonInputAddElement, elementsList, 
  popupCardSelector, nameProfile, jobProfile } from '../utils/constants.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';

import './index.css';

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


const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.elements-template', () => handleCardClick(item.name, item.link));
    const cardElement = card.createElement()
    
    defaultCardList.addItem(cardElement);
  },
},
elementsList);

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
  popupAddElementSubmit.close()
  }
});

//Функция установки значений в попап открытия картинки
export function handleCardClick (name, link) {
  const popupWithImageCard = new PopupWithImage({
    data: {
      name, 
      link
  }}, popupCardSelector);
  popupWithImageCard.open()
  popupWithImageCard.setEventListeners()
}

//Функция установки значений в поля ввода попапа редактирования профиля
export function setValue(){
  const userInfo = popupRedactProfile.getUserInfo();
  popupEditProfile.querySelector('.input__text_type_name').value = userInfo.name.textContent;
  popupEditProfile.querySelector('.input__text_type_job').value = userInfo.job.textContent;
}

buttonOpenPopupEditProfile.addEventListener('click', function(){
  formValidators['profile-form'].resetErrors();
  popupRedactProfile.open();
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



