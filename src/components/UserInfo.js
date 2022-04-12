import { Popup } from './Popup.js'
export class UserInfo{
  constructor(userName, userProfession, userAvatar) {
    this._userName = userName;
    this._userProfession = userProfession;
    this._userAvatar = userAvatar
  }

  //метод, возвращает объект с данными пользователя. 
  //Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    const userData = {
      name: this._userName.textContent,
      job: this._userProfession.textContent,
      avatar: this._userAvatar.src
    };
    
    return userData;
  }

  //метод, принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(name, about, avatar) {
    this._userName.textContent = name;
    this._userProfession.textContent = about;
    this._userAvatar.src = avatar
  }
}