const validationConfig = {
  formSelector: '.input',
  inputSelector: '.input__text',
  submitButtonSelector: '.input__submit-btn',
  inactiveButtonClass: 'input__submit-btn_disabled',
  inputErrorClass: 'input__text_type_error',
};

const buttonOpenPopupEditProfile = document.querySelector('.profile__button-edit');
const buttonOpenPopupAddElement = document.querySelector('.profile__button-add');
const avatar = document.querySelector('.profile__avatar')
const popupProfileEdit = '.popup_edit-profile';
const popupElementAdd = '.popup_add-element';
const popupCard = '.popup_card';
const popupConfirmDeleteCard ='.popup_delete-confirm'
const popupEditAvatar = '.popup_edit-avatar'
const elementsList = '.elements';
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const inputName = document.querySelector('.input__text_type_name');
const inputJob = document.querySelector('.input__text_type_job');

export { validationConfig, buttonOpenPopupEditProfile, buttonOpenPopupAddElement, avatar,
  popupProfileEdit, popupElementAdd, popupCard, popupConfirmDeleteCard, popupEditAvatar, elementsList, 
  nameProfile, jobProfile, inputName, inputJob }