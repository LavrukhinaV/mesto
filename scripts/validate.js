//Функция установить подсказку и класс для невалидного поля
const setInputInvalid = (inputErrorClass, errorMessage, input) => {
  errorMessage.textContent = input.validationMessage;
  input.classList.add(inputErrorClass);
}

//Функция удалить подсказку и класс для валидного поля
const setInputValid = (inputErrorClass, errorMessage, input) => {
  errorMessage.textContent = '';
  input.classList.remove(inputErrorClass);
}

//Функция проверки поля ввода на валидность
const checkInputValidity = ({ inputErrorClass }, form, input) => {
  const errorMessage = form.querySelector(`#error-${input.id}`)
  if (input.validity.valid) {
    setInputValid(inputErrorClass, errorMessage, input);
  } else {
    setInputInvalid(inputErrorClass, errorMessage, input);
  };
}

//Функция сделать кнопку не активной
const disableButton = (inactiveButtonClass, button) => {
  button.setAttribute('disabled', '');
  button.classList.add(inactiveButtonClass);
}

//Функция проверки кнопки на валидность
const checkButtonValidity = ({ inactiveButtonClass }, form, button) => {
  if(form.checkValidity()) {
    button.removeAttribute('disabled');
    button.classList.remove(inactiveButtonClass);
  } else {
    disableButton(inactiveButtonClass, button)
  }
}

function enableValidation({ formSelector, inputSelector, submitButtonSelector, actualForm, ...rest }) {

  const currentForm = document.querySelector(actualForm);
  const form = currentForm.querySelector(formSelector);
  const inputs = form.querySelectorAll(inputSelector);
  const button = form.querySelector(submitButtonSelector);
  
  inputs.forEach(input => {
    input.addEventListener('input', (event) => {
      checkInputValidity(rest, form, input);
      checkButtonValidity(rest, form, button);
    });
  });
}