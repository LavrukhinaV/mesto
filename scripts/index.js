import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import { popupCard, popupImage, popupCaption } from './constants.js';
import { openPopup, closePopup } from './utils.js'

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
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const inputName = document.querySelector('.input__text_type_name');
const inputJob = document.querySelector('.input__text_type_job');
const inputTitle = document.querySelector('.input__text_type_title');
const inputLink = document.querySelector('.input__text_type_link');
const buttonInputEditProfile = document.querySelector('.input_edit-profile');
const buttonInputAddElement = document.querySelector('.input_add-name');
const elementsList = document.querySelector('.elements');
const popups = document.querySelectorAll('.popup')

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
const handleCardClick = (name, link) => {
  popupImage.src = link;
  popupCaption.textContent = name;
  popupImage.alt = name;
  openPopup(popupCard);
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

// Функция создания карточки
function createCard(element) {
  const cardNew = new Card(element, '.elements-template', () => handleCardClick(element.name, element.link));
  const cardElement = cardNew.createElement()
  return cardElement;
};

// Функция добавления новой карточки
function submitCardForm(evt) {
  evt.preventDefault();
  elementsList.prepend(createCard({ 
    name: inputTitle.value, 
    link: inputLink.value 
  })); 
  buttonInputAddElement.reset();
  closePopup(popupAddElement);
}

function render() { 
  initialCards.forEach((element) => { 
    elementsList.append(createCard(element)) 
  }) 
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

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-btn')) {
        closePopup(popup)
      }
  })
})

buttonOpenPopupEditProfile.addEventListener('click', function(){
  formValidators['profile-form'].resetErrors();
  setValue();
  formValidators['profile-form'].checkButtonValidity();
  openPopup(popupEditProfile);
  
});

buttonOpenPopupAddElement.addEventListener('click',() => {
  openPopup(popupAddElement);
  formValidators['add-card'].resetErrors();
});

buttonInputEditProfile.addEventListener('submit', submitEditProfileForm);
buttonInputAddElement.addEventListener('submit', submitCardForm);

render()

