const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popupSection = document.querySelector('.popup');
const popupForm = popupSection.querySelector('.popup__container');
const popupCancel = popupSection.querySelector('.popup__reset');
const popupName = popupSection.querySelector('.popup__input_name');
const popupDesc = popupSection.querySelector('.popup__input_description');

const profileSection = document.querySelector('.profile');
const editButton = profileSection.querySelector('.profile__editbutton');
const addButton = profileSection.querySelector('.profile__addbutton');
const profileName = profileSection.querySelector('.profile__name');
const profileDesc = profileSection.querySelector('.profile__description');

const elementsContainer = document.querySelector('.elements');

//Показываем если закрыт - скрываем если открыт popup
function showHidePopup(evt) {

  let popupTitle = popupForm.querySelector('.popup__title');

  let isAddCard = false;
  let isEditProfile = false;
  //Если закрываем по сабмиту - ивент не нужен
  if (evt) {
    isAddCard = evt.currentTarget.classList.contains('profile__addbutton');
    isEditProfile = evt.currentTarget.classList.contains('profile__editbutton');
  }

  let isOpen = popupSection.classList.contains('popup_opened');

  //Если событие пришло от кнопки добавления карточки
  if (isAddCard && !isOpen) {
    popupTitle.textContent = "Новое место";
    popupName.placeholder = "Название";
    popupDesc.placeholder = "Ссылка на картинку";
    popupName.value = "";
    popupDesc.value = "";
  }

  //Или от кнопки редактирования.
  if (isEditProfile && !isOpen) {
    popupTitle.textContent = "Редактировать профиль";
    popupName.placeholder = "Имя";
    popupDesc.placeholder = "Описание";
    popupName.value = profileName.textContent;
    popupDesc.value = profileDesc.textContent;
  }

  popupSection.classList.toggle('popup_opened');
}

//Обработка лайка
function reverseLike(evt) {
  evt.currentTarget.classList.toggle('element__like_state_on');
}

//и делита
function deleteCard(evt) {
  evt.currentTarget.parentNode.parentNode.remove();
}

// Создание карточки
function createCard (description, photoUrl) {
  //Создаем карточку из шаблона
  const cardTemplate = document.querySelector('#card').content;
  const elementCard = cardTemplate.cloneNode(true);

  //и добавляем в нее фотоку и на кнопку удаления обработчик
  const viewPort = elementCard.querySelector('.element__viewport');
  viewPort.style.backgroundImage = `url('${photoUrl}')`;

  const deleteButton = elementCard.querySelector('.element__delete');
  deleteButton.addEventListener('click', deleteCard);

  //Добавим описание и обработку лайкоа
  const cardPlaceName = elementCard.querySelector('.element__placename');
  cardPlaceName.textContent = description;

  const likeButton = elementCard.querySelector('.element__like');
  likeButton.addEventListener('click', reverseLike);

  return elementCard;
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  let popupTitle = popupForm.querySelector('.popup__title').textContent;

  if (popupTitle === "Редактировать профиль") {
    profileName.textContent = popupName.value;
    profileDesc.textContent = popupDesc.value;
  }

  if (popupTitle === "Новое место") {
    elementsContainer.insertBefore(createCard(popupName.value, popupDesc.value), elementsContainer.firstElementChild);
  }

  showHidePopup();
}

function addCardHandler(evt) {
  console.log('I am addCardHandler');
  // insertBefore(createCard(item.name, item.link), elementsContainer.firstElementChild);
  // - вставка в начало
}

initialCards.forEach((item) => {elementsContainer.appendChild(createCard(item.name, item.link));});

//Вешаем обработчики на элементы формы
editButton.addEventListener('click', showHidePopup);
addButton.addEventListener('click', showHidePopup);
popupCancel.addEventListener('click', showHidePopup);
popupForm.addEventListener('submit', formSubmitHandler);
