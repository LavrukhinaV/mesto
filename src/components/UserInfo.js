import { Popup } from './Popup.js'
export class UserInfo{
  constructor(userName, userProfession) {
    this._userName = userName;
    this._userProfession = userProfession;

  }

  //метод, возвращает объект с данными пользователя. 
  //Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    const userData = {
      name: this._userName.textContent,
      job: this._userProfession.textContent
    };
    
    return userData;
  }

  //метод, принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(formData) {
    this._userName.textContent = formData.name;
    this._userProfession.textContent = formData.profession;
  }
}