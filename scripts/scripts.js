const OpenPopupButton = document.querySelector('.profile__button-edit')
const popup = document.querySelector('.popup')
const ClosePopupButton = document.querySelector('.popup__close-btn')

function openPopup() {
  popup.classList.add('popup_opened');
  let nameInput = document.querySelector('.profile__name').textContent;
  document.querySelector('.input__text_type_name').value = nameInput;
  let jobInput = document.querySelector('.profile__about').textContent
  document.querySelector('.input__text_type_about').value = jobInput;
}

function closePopup() {
  popup.classList.remove('popup_opened')
}

OpenPopupButton.addEventListener('click', openPopup)
ClosePopupButton.addEventListener('click', closePopup)

function input() {
let input_name = document.querySelector('.input__text_type_name').value;
document.querySelector('.profile__name').textContent= input_name;
let input_about = document.querySelector('.input__text_type_about').value;
document.querySelector('.profile__about').textContent = input_about;
popup.classList.remove('popup_opened');
}

const SubmitPopupButton = document.querySelector('.popup__submit-btn');
SubmitPopupButton.addEventListener('click', input);
