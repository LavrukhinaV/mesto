import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
  constructor({data}, popupSelector) {
    super(popupSelector);
    this._name = data.name;
    this._link = data.link;
  }

  open() {
    const popupImage = this._popupSelector.querySelector('.popup__image');
    
    popupImage.src = this._link;
    this._popupSelector.querySelector('.popup__caption').textContent = this._name;
    popupImage.alt = this._name;
    super.open()
  }
}