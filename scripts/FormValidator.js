export class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._settings = settings;
    this._inputs = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    this._button = this._form.querySelector(this._settings.submitButtonSelector);
  }

  //Функция установить подсказку и класс для невалидного поля
  _setInputInvalid (errorMessage, input) {
    errorMessage.textContent = input.validationMessage;
    input.classList.add(this._settings.inputErrorClass);
  }
  
  //Функция удалить подсказку и класс для валидного поля
  _setInputValid (errorMessage, input) {
    errorMessage.textContent = '';
    input.classList.remove(this._settings.inputErrorClass);
    
  }

  //Функция проверки поля ввода на валидность
  _checkInputValidity (input) {
    const errorMessage = this._form.querySelector(`#error-${input.id}`);
    if (input.validity.valid) {
      this._setInputValid(errorMessage, input);
    } else {
      this._setInputInvalid(errorMessage, input);
    };
  }

  //Функция сделать кнопку не активной
  _disableButton () {
    this._button.setAttribute('disabled', '');
    this._button.classList.add(this._settings.inactiveButtonClass);
  }

  _hasInvalidInput() {
    return this._inputs.some((input) => {
      return !input.validity.valid;
    });
  }

  //Функция проверки кнопки на валидность
  checkButtonValidity () {
    if(this._hasInvalidInput()) {
      this._disableButton()
    } else {
      this._button.removeAttribute('disabled');
      this._button.classList.remove(this._settings.inactiveButtonClass);
    }
  }

    enableValidation() {
     this._inputs.forEach(input => {
        input.addEventListener('input', () => {
          this._checkInputValidity(input);
          this.checkButtonValidity(input);
        });
      });
   }

   resetErrors() {
    this._form.reset()
    this._inputs.forEach((input) => {
      this._setInputValid ((this._form.querySelector(`#error-${input.id}`)), input)
    });
    this._disableButton();
   }
}

