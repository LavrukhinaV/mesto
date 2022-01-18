const OpenPopupButton = document.querySelector('.profile__button-edit')
const popup = document.querySelector('.popup')
const ClosePopupButton = document.querySelector('.popup__close-btn')

function openPopup() {
  popup.classList.add('popup_opened');
  let nameInput = document.querySelector('.profile__name').textContent;
  document.querySelector('.input__text_type_name').value = nameInput;
  let jobInput = document.querySelector('.profile__job').textContent
  document.querySelector('.input__text_type_job').value = jobInput;
}

function closePopup() {
  popup.classList.remove('popup_opened')
}

OpenPopupButton.addEventListener('click', openPopup)
ClosePopupButton.addEventListener('click', closePopup)

function input(evt) {
  evt.preventDefault();
  let input_name = document.querySelector('.input__text_type_name').value;
  document.querySelector('.profile__name').textContent= input_name;
  let input_job = document.querySelector('.input__text_type_job').value;
  document.querySelector('.profile__job').textContent = input_job;
  popup.classList.remove('popup_opened');
}

const inputPopupButton = document.querySelector('.input');
inputPopupButton.addEventListener('submit', input);
