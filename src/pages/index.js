import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { api } from '../components/Api.js';
import { validationConfig, buttonOpenPopupEditProfile, buttonOpenPopupAddElement, avatar,
  popupProfileEdit, popupElementAdd, popupCard, popupConfirmDeleteCard, popupEditAvatar, elementsList, 
  nameProfile, jobProfile, inputName, inputJob } from '../utils/constants.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';

import './index.css';

let userId

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    popupRedactProfile.setUserInfo(userData.name, userData.about, userData.avatar);
    cardsList.renderer(cards)
  })
  .catch(err => console.log(`Ошибка: ${err}`));

const formValidators = {};

// Включение валидации
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement)

    const formName = formElement.getAttribute('name')

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

const popupWithImage = new PopupWithImage(popupCard);
popupWithImage.setEventListeners();

const cardsList = new Section({
  renderer: (item) => {
    const card = addCard(item)
    cardsList.addItemAppendElement(card)
  }},
elementsList);

const popupRedactProfile = new UserInfo(
  nameProfile, 
  jobProfile,
  avatar
);

const popupEditProfile = new PopupWithForm(popupProfileEdit, handleProfileFormSubmit);
popupEditProfile.setEventListeners();

const popupAddElement = new PopupWithForm(popupElementAdd, handleCardFormSubmit);
popupAddElement.setEventListeners();

const popupConfirm = new PopupWithForm(popupConfirmDeleteCard);
popupConfirm.setEventListeners();

const popupAvatar = new PopupWithForm(popupEditAvatar, handleAvatarFormSubmit);
popupAvatar.setEventListeners();

function addCard(element){
  const cardNew = new Card
  (element, userId,
  '.elements-template',
  () => {
    popupWithImage.open(element.link, element.name)
  },
  (id) => {
    popupConfirm.open();
    popupConfirm.changeSubmitCardForm(() => {
      api.deleteCard(id)
        .then(() => {
          cardNew.deleteCard();
          popupConfirm.close()
        })
        .catch(err => console.log(`Ошибка: ${err}`))
    }) 
  },
  (id) => {
    if(cardNew.checkLike()) {
      api.deleteLike(id)
      .then(res => {
        cardNew.setLikes(res.likes)
      })
      .catch(err => console.log(`Ошибка: ${err}`))
    } else {
      api.addLike(id)
      .then(res => {
        cardNew.setLikes(res.likes)
      })
      .catch(err => console.log(`Ошибка: ${err}`))
    }
  });
  return cardNew.createElement();
}; 

function prependItem(data) {
  api.addCard(data)
  .then(res => {
    const card = addCard(res)
    cardsList.addItemPrependElement(card);
  })
  .catch(err => console.log(`Ошибка: ${err}`))
  .finally(() => {
    popupAddElement.renderLoading(false);
  })
}

function handleCardFormSubmit(data){
  popupAddElement.renderLoading(true);
  prependItem(data);
  popupAddElement.close();
}

function handleProfileFormSubmit(data) {
  popupEditProfile.renderLoading(true)
  const newInfo = { name: data.name, about: data.profession };
  api.editProfile (newInfo)
    .then((data) => {
      popupRedactProfile.setUserInfo(data.name, data.about, data.avatar);
    })
    .then(() => {
      popupEditProfile.close();
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      popupEditProfile.renderLoading(false);
    })
}

function handleAvatarFormSubmit(data) {
  popupAvatar.renderLoading(true)
  api.editAvatar ({avatar: data['link']})
    .then((data) => {
      popupRedactProfile.setUserInfo(data.name, data.about, data.avatar)
    })
    .then(() => {
      popupAvatar.close();
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      popupAvatar.renderLoading(false);
    })
}

function setValueInPopupEditProfile(){
  const {name, job} = popupRedactProfile.getUserInfo();
  inputName.value = name;
  inputJob.value = job;
};

buttonOpenPopupEditProfile.addEventListener('click', function(){
  formValidators['profile-form'].resetErrors();
  popupEditProfile.open();
  setValueInPopupEditProfile();
});

buttonOpenPopupAddElement.addEventListener('click',() => {
  popupAddElement.open();
  formValidators['add-card'].resetErrors();
});

avatar.addEventListener('click', () => {
  formValidators['edit-avatar'].resetErrors();
  popupAvatar.open();
})



