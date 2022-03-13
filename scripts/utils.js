// Функция открытия попапа
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};

//Функция закрытия попапа нажатием на Esc
export function closeByEscape (event) {
  if(event.key === "Escape"){
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

