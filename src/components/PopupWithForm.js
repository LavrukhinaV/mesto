import { Popup } from './Popup.js'

export class PopupWithForm extends Popup{
  constructor(popupSelector, submitCardForm) {
    super(popupSelector);
    this._submitCardForm = submitCardForm;
    this._inputList = Array.from(this._popup.querySelectorAll('.input__text'));
    this._form = this._popup.querySelector('.input');
    this._button = this._form.querySelector('.input__submit-btn');
    this._buttonContent = this._button.textContent;
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    
    return this._formValues;
  
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._button.textContent = 'Сохранение ...';
    } else
      this._button.textContent = this._buttonContent;
  }

  changeSubmitCardForm(newSubmitHandler) {
    this._submitCardForm = newSubmitHandler
  }

  setEventListeners(){
    super.setEventListeners()
    this._popup.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitCardForm(this._getInputValues());
  })
  }

  close() {
    super.close();
    this._form.reset();
    this.renderLoading(false);
  }
}