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
};

const buttonOpenPopupEditProfile = document.querySelector('.profile__button-edit');
const buttonOpenPopupAddElement = document.querySelector('.profile__button-add');
const popupEditProfile = '.popup_edit-profile';
const popupAddElement = '.popup_add-element';
const popupCard = '.popup_card';
const buttonInputEditProfile = document.querySelector('.input_edit-profile');
const buttonInputAddElement = document.querySelector('.input_add-name');
const elementsList = '.elements';
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const inputName = document.querySelector('.input__text_type_name'); 
const inputJob = document.querySelector('.input__text_type_job'); 

export { initialCards, validationConfig, buttonOpenPopupEditProfile, buttonOpenPopupAddElement, 
  popupEditProfile, popupAddElement, popupCard, buttonInputEditProfile, buttonInputAddElement, elementsList, 
  nameProfile, jobProfile, inputName, inputJob }