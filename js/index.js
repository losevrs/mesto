let popupSection = document.querySelector('.popup');
let popupForm = popupSection.querySelector('.popup__container');
let popupCancel = popupSection.querySelector('.popup__reset');
let popupName = popupSection.querySelector('.popup__inputname');
let popupDesc = popupSection.querySelector('.popup__inputdescription');

let profileSection = document.querySelector('.profile');
let editButton = profileSection.querySelector('.profile__editbutton');
let profileName = profileSection.querySelector('.profile__name');
let profileDesc = profileSection.querySelector('.profile__description');

//Инициализация полей формы
let popupInit = (pName, pDesc) => {
  popupName.value = pName;
  popupDesc.value = pDesc;
}

//Показываем если закрыт - скрываем если открыт popup
let showPopup = () => {
  popupInit(profileName.textContent, profileDesc.textContent);
  popupSection.classList.toggle('popup_opened');
}

let hidePopup = () => popupSection.classList.toggle('popup_opened');

//Вешаем обработчики на элементы формы
editButton.addEventListener('click',showPopup);
popupCancel.addEventListener('click',hidePopup);

//Сохранение введенных значений
let saveNameDesc = (pName, pDesc) => {
  profileName.textContent = pName;
  profileDesc.textContent = pDesc;
}

//Обработка результатов ввода.
let formSubmitHandler = (evt) => {
  evt.preventDefault();
  saveNameDesc(popupName.value, popupDesc.value);
  hidePopup();
}

popupForm.addEventListener('submit', formSubmitHandler);
