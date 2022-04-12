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

api.getProfile()
  .then(res => {
    popupRedactProfile.setUserInfo(res.name, res.about, res.avatar);
    userId = res._id;
  })

api.getInitialCards()
  .then(cardList => {
    cardList.forEach(data => {
      const card = addCard(data, userId)
      cardsList.addItemAppendElement(card)
    })
  })
 

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
  items: [],
  renderer: prependItem,
},
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
    }) 
  },
  (id) => {
    if(cardNew.checkLike()) {
      api.deleteLike(id)
      .then(res => {
        cardNew.setLikes(res.likes)
      })
    } else {
      api.addLike(id)
      .then(res => {
        cardNew.setLikes(res.likes)
      })
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
      popupEditProfile.close();
    });
}

function handleAvatarFormSubmit(data) {
  popupAvatar.renderLoading(true)
  api.editAvatar ({avatar: data['link']})
    .then((data) => {
      popupRedactProfile.setUserInfo(data.name, data.about, data.avatar)
      popupAvatar.close();
    });
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
  formValidators['profile-form'].checkButtonValidity();
});

buttonOpenPopupAddElement.addEventListener('click',() => {
  popupAddElement.open();
  formValidators['add-card'].resetErrors();
});

avatar.addEventListener('click', () => {
  popupAvatar.open();
})



