import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { initialCards, validationConfig, buttonOpenPopupEditProfile, buttonOpenPopupAddElement, 
  popupEditProfile, popupAddElement, popupCard, buttonInputEditProfile, buttonInputAddElement, elementsList, 
  nameProfile, jobProfile, inputName, inputJob } from '../utils/constants.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';

import './index.css';

const formValidators = {};

// Включение валидации
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement)

    const formName = formElement.getAttribute('name')

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

const popupWithImage = new PopupWithImage(popupCard);
popupWithImage.setEventListeners();

const cardsList = new Section({
  items: initialCards,
  renderer: prependItem,
},
elementsList);

const popupRedactProfile = new UserInfo(
  nameProfile, 
  jobProfile
);

const popupEditProfileSubmit = new PopupWithForm(
  popupEditProfile, (formData) => {
    popupRedactProfile.setUserInfo(formData);
    popupEditProfileSubmit.close();
  }
);

popupEditProfileSubmit.setEventListeners();

const popupAddElementSubmit = new PopupWithForm(popupAddElement, handleCardFormSubmit);

popupAddElementSubmit.setEventListeners();

function addCard(element){
  const cardNew = new Card
  (element,
  '.elements-template',
  () => popupWithImage.open(element.link, element.name));
  return cardNew.createElement();
}; 

function prependItem(data) {
  const card = addCard(data);
  cardsList.addItem(card);
}

function handleCardFormSubmit(data){
  prependItem(data);
  popupAddElementSubmit.close();
}

function setValue(){
  const {name, job} = popupRedactProfile.getUserInfo();
  inputName.value = name;
  inputJob.value = job;
};

buttonOpenPopupEditProfile.addEventListener('click', function(){
  formValidators['profile-form'].resetErrors();
  popupEditProfileSubmit.open();
  setValue();
  formValidators['profile-form'].checkButtonValidity();
});

buttonOpenPopupAddElement.addEventListener('click',() => {
  popupAddElementSubmit.open();
  formValidators['add-card'].resetErrors();
});

cardsList.renderer();



