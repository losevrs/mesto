let popupSection = document.querySelector('.popup');
let popupForm = popupSection.querySelector('.popup__container');
let popupCancel = popupSection.querySelector('.popup__reset');
let popupName = popupSection.querySelector('.popup__input_name');
let popupDesc = popupSection.querySelector('.popup__input_description');

let profileSection = document.querySelector('.profile');
let editButton = profileSection.querySelector('.profile__editbutton');
let profileName = profileSection.querySelector('.profile__name');
let profileDesc = profileSection.querySelector('.profile__description');

//Показываем если закрыт - скрываем если открыт popup
function showHidePopup() {
  if (!popupSection.classList.contains('popup_opened')) {
    popupName.value = profileName.textContent;
    popupDesc.value = profileDesc.textContent;
  }
  popupSection.classList.toggle('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDesc.textContent = popupDesc.value;
  showHidePopup();
}

//Вешаем обработчики на элементы формы
editButton.addEventListener('click', showHidePopup);
popupCancel.addEventListener('click', showHidePopup);
popupForm.addEventListener('submit', formSubmitHandler);
