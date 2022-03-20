import { Popup } from './Popup.js'
export class UserInfo extends Popup {
  constructor({userNameSelector, userProfessionSelector}, popupSelector) {
    super(popupSelector);
    this._userNameSelector = userNameSelector;
    this._userProfessionSelector = userProfessionSelector;
  }

  //метод, возвращает объект с данными пользователя. 
  //Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    const userData = {
      name: this._userNameSelector,
      job: this._userProfessionSelector
    };
    
    this._popupSelector.querySelector('.input__text_type_name').value = userData.name.textContent;
    this._popupSelector.querySelector('.input__text_type_job').value = userData.job.textContent;
  }

  //метод, принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(formData) {
    this._userNameSelector.textContent = formData.name;
    this._userProfessionSelector.textContent = formData.profession;
  }
}