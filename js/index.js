let popupSection = document.querySelector('.popup');
let popupForm = popupSection.querySelector('.popup__container');
let popupCancel = popupSection.querySelector('.popup__reset');
let popupName = popupSection.querySelector('.popup__inputname');
let popupDesc = popupSection.querySelector('.popup__inputdescription');

let profileSection = document.querySelector('.profile');
let editButton = profileSection.querySelector('.profile__editbutton');
let profileName = profileSection.querySelector('.profile__name');
let profileDesc = profileSection.querySelector('.profile__description');

//Показываем если закрыт - скрываем если открыт popup
let showHidePopup = () => {
  popupName.value = profileName.textContent;
  popupDesc.value = profileDesc.textContent;
  popupSection.classList.toggle('popup_opened');
}

let formSubmitHandler = (evt) => {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDesc.textContent = popupDesc.value;
  showHidePopup();
}

//Вешаем обработчики на элементы формы
editButton.addEventListener('click', showHidePopup);
popupCancel.addEventListener('click', showHidePopup);
popupForm.addEventListener('submit', formSubmitHandler);
