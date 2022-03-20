import { Popup } from './Popup.js'
import { popupImage, popupCaption } from './constants.js';
export class PopupWithImage extends Popup {
  constructor({data}, popupSelector) {
    super(popupSelector);
    this._name = data.name;
    this._link = data.link;
  }

  open() {
    popupImage.src = this._link;
    popupCaption.textContent = this._name;
    popupImage.alt = this._name;
    super.open()
  }
}