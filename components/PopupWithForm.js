import { Popup } from './Popup.js'

export class PopupWithForm extends Popup{
  constructor({popupSelector, submitCardForm}) {
    super(popupSelector);
    this._submitCardForm = submitCardForm;
  }

  _getInputValues() {
    const inputsList = Array.from(this._popupSelector.querySelectorAll('.input__text'));
  
    this._formValues = {};

    inputsList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  
  }

  setEventListeners(){
    super.setEventListeners()
    this._popupSelector.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitCardForm(this._getInputValues());
  })
  }
}