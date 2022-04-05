import { Popup } from './Popup.js'

export class PopupWithForm extends Popup{
  constructor(popupSelector, submitCardForm) {
    super(popupSelector);
    this._submitCardForm = submitCardForm;
    this._inputList = Array.from(this._popup.querySelectorAll('.input__text'));
    this._form = this._popup.querySelector('.input')
  }

  _getInputValues() {
    
    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  
  }

  setEventListeners(){
    super.setEventListeners()
    this._popup.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitCardForm(this._getInputValues());
  })
  }

  close() {
    super.close()
    this._form.reset()
  }
}