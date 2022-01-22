const openPopupButton = document.querySelector('.profile__button-edit');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close-btn');
const nameInput = document.querySelector('.profile__name');
const jobInput = document.querySelector('.profile__job');
const inputName = document.querySelector('.input__text_type_name');
const inputJob = document.querySelector('.input__text_type_job');
const inputPopupButton = document.querySelector('.input');

function openPopup() {
  popup.classList.add('popup_opened');
  inputName.value = nameInput.textContent;
  inputJob.value = jobInput.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInput.textContent = inputName.value;
  jobInput.textContent = inputJob.value;
  closePopup();
}

inputPopupButton.addEventListener('submit', formSubmitHandler);
openPopupButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);