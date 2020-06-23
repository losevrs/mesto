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
  //Создаем карточку
  const elementCard = document.createElement('div');
  elementCard.classList.add('element');

  //и добавляем в нее фотоку
  const viewPort = document.createElement('div');
  viewPort.classList.add('element__viewport');
  viewPort.style.backgroundImage = `url('${photoUrl}')`;
  //добавим кнопку удаления
  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.classList.add('element__delete');
  deleteButton.addEventListener('click', deleteCard);
  viewPort.appendChild(deleteButton);
  elementCard.appendChild(viewPort);

  //Создадим описание
  const cardDescription = document.createElement('div');
  cardDescription.classList.add('element__description');
  //с наименованием места
  const cardPlaceName = document.createElement('h2');
  cardPlaceName.classList.add('element__placename');
  cardPlaceName.textContent = description;
  //и лайком
  const likeButton = document.createElement('button');
  likeButton.type = 'button';
  likeButton.classList.add('element__like');
  likeButton.addEventListener('click', reverseLike);

  cardDescription.appendChild(cardPlaceName);
  cardDescription.appendChild(likeButton);

  //и добавим его к карточке
  elementCard.appendChild(cardDescription);

  return elementCard;
}

//insertBefore(createCard(item.name, item.link), elementsContainer.firstElementChild); - вставка в начало
for (let i in initialCards) {
  elementsContainer.appendChild(createCard(initialCards[i].name, initialCards[i].link));
}

//Вешаем обработчики на элементы формы
editButton.addEventListener('click', showHidePopup);
popupCancel.addEventListener('click', showHidePopup);
popupForm.addEventListener('submit', formSubmitHandler);
