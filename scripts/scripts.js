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
const popupAddElement = document.querySelector('.popup_add-element')
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
const popupOverlay = Array.from(document.querySelectorAll('.popup'));
const buttonSubmitAddCardForm = document.querySelector('.input__submit-btn_type_add-name');


// функция создания карточки и добавления слушателей
function createElement(element) {
  cardElement = elementsTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__title').textContent = element.name;
  cardElement.querySelector('.element__image').src = element.link;
  cardElement.querySelector('.element__image').alt = element.name;
  
  addListeners(cardElement);
  return cardElement;
};

// Функция добавления обработчиков
function addListeners(el) {
  el.querySelector('.element__button-delete').addEventListener('click', deleteCard);
  el.querySelector('.element__button-like').addEventListener('click', likeCard);
  el.querySelector('.element__image').addEventListener('click', function(event){
    setAtributPopupCard(event);
    openPopup(popupCard);
  });
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

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
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

//Функция закрытия попапа нажатием на Esc
function closeByEscape (event) {
  if(event.key === "Escape"){
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//Функция установки значений в попап открытия картинки
function setAtributPopupCard(event) {
  popupImage.src = event.target.closest('.element').querySelector('.element__image').src;
  popupCaption.textContent = event.target.closest('.element').querySelector('.element__title').textContent;
  popupImage.alt = event.target.closest('.element').querySelector('.element__title').textContent;
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
  elementsList.prepend(createElement ({
    name: inputTitle.value,
    link: inputLink.value
  }));
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
});

buttonClosePopupEditProfile.addEventListener('click',() => closePopup(popupEditProfile));

buttonOpenPopupAddElement.addEventListener('click',() => {
  openPopup(popupAddElement);
  disenableButton(buttonSubmitAddCardForm);
});

buttonClosePopupAddElement.addEventListener('click', () => closePopup(popupAddElement));
buttonClosePopupCard.addEventListener('click', () => closePopup(popupCard));
buttonInputEditProfile.addEventListener('submit', submitEditProfileForm);
buttonInputAddElement.addEventListener('submit', submitCardForm);
popupOverlay.forEach((e)=>e.addEventListener('click', closePopupOnOverlay));


render();







