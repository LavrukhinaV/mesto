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

function enableValidation({ formSelector, inputSelector, submitButtonSelector, ...rest }) {

  const form = document.querySelectorAll(formSelector);

  form.forEach((form) => {
    const inputs = form.querySelectorAll(inputSelector);
    const button = form.querySelector(submitButtonSelector);
    inputs.forEach(input => {
      input.addEventListener('input', (event) => {
        checkInputValidity(rest, form, input);
        checkButtonValidity(rest, form, button);
      });
    });
 }
)}

enableValidation({
  formSelector: '.input',
  inputSelector: '.input__text',
  submitButtonSelector: '.input__submit-btn',
  inactiveButtonClass: 'input__submit-btn_disabled',
  inputErrorClass: 'input__text_type_error',
}); 