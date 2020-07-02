'use strict';

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

const popupProfile = document.querySelector('.popup_profileedit');
const popupProfileForm = popupProfile.querySelector('.popup__container');
const popupProfileName = popupProfileForm.querySelector('.popup__input_name');
const popupProfileDescription = popupProfileForm.querySelector('.popup__input_description');
const popupProfileReset = popupProfileForm.querySelector('.popup__reset');

const popupNewplace = document.querySelector('.popup_newplace');
const popupNewplaceForm = popupNewplace.querySelector('.popup__container');
const popupNewplaceName = popupNewplaceForm.querySelector('.popup__input_photoname');
const popupNewplaceUrl = popupNewplaceForm.querySelector('.popup__input_photourl');
const popupNewplaceReset = popupNewplaceForm.querySelector('.popup__reset');


const popupView = document.querySelector('.popup_view');
const popupViewImage = popupView.querySelector('.popup__image');
const popupViewImageTitle = popupView.querySelector('.popup__imagetitle');
const popupViewReset = popupView.querySelector('.popup__reset');

const profileSection = document.querySelector('.profile');

const editButton = profileSection.querySelector('.profile__editbutton');
const addButton = profileSection.querySelector('.profile__addbutton');

const profileName = profileSection.querySelector('.profile__name');
const profileDesc = profileSection.querySelector('.profile__description')

const placesPhotosContainer = document.querySelector('.placesphotos');

const cardTemplate = document.querySelector('#card').content;

function openPopup(popupElement) {
  if (!popupElement.classList. contains('popup_opened')) {
    popupElement.classList.add('popup_opened');
  }
}

function closePopup(event) {
  const popupElement = event.currentTarget.closest('.popup');
  if (popupElement.classList.contains('popup_opened')) {
    popupElement.classList.remove('popup_opened');
  }
}

function showProfile() {
  popupProfileName.value = profileName.textContent;
  popupProfileDescription.value = profileDesc.textContent;
  openPopup(popupProfile);
}

function showAddCardForm() {
  popupNewplaceForm.reset();
  openPopup(popupNewplace);
}

function showPhotoView(event) {
  popupViewImage.src = event.target.src;
  popupViewImageTitle.textContent = event.target.alt;
  openPopup(popupView);
}

//Обработка лайка на карточке
function toggleLike(event) {
  event.currentTarget.classList.toggle('photocard__like_on');
  event.stopPropagation();
}

//Обработка делита карточки
function deleteCardListeners(elementCard) {
  const viewPort = elementCard.querySelector('.photocard__viewport');
  const deleteButton = elementCard.querySelector('.photocard__delete');
  const likeButton = elementCard.querySelector('.photocard__like');

  viewPort.removeEventListener('click', showPhotoView);
  deleteButton.removeEventListener('click', deleteCard);
  likeButton.removeEventListener('click', toggleLike);
}

function deleteCard(event) {
  const card = event.currentTarget.closest('.photocard');
  deleteCardListeners(card);
  card.remove();
  event.stopPropagation();
}

function onErrorLoadImage (event) {
  event.target.src = './images/placesphotos/onerror.jpg';
}

// Создание карточки из шаблона
function createCard (cardData) {

  const elementCard = cardTemplate.cloneNode(true);

  const viewPort = elementCard.querySelector('.photocard__viewport');
  viewPort.src = cardData.link;
  viewPort.alt = cardData.name;
  viewPort.addEventListener('click', showPhotoView);
  viewPort.onerror = onErrorLoadImage;

  const deleteButton = elementCard.querySelector('.photocard__delete');
  deleteButton.addEventListener('click', deleteCard);

  const cardPlaceName = elementCard.querySelector('.photocard__placename');
  cardPlaceName.textContent = cardData.name;

  const likeButton = elementCard.querySelector('.photocard__like');
  likeButton.addEventListener('click', toggleLike);

  return elementCard;
}

// Сабмиты

function profileFormSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileDesc.textContent = popupProfileDescription.value;
  closePopup(event);
}

function addCardFormSubmitHandler(event) {
  const cardData = {
    name: popupNewplaceName.value,
    link: popupNewplaceUrl.value
  };
  event.preventDefault();
  placesPhotosContainer.prepend(createCard(cardData));
  closePopup(event);
}

// Инициализация

function cardsInit() {
  initialCards.forEach((item) => {
    placesPhotosContainer.appendChild(createCard(item));
  });
}

function setPageListeners() {
  editButton.addEventListener('click', showProfile);
  addButton.addEventListener('click', showAddCardForm);

  popupProfileReset.addEventListener('click', closePopup);
  popupNewplaceReset.addEventListener('click', closePopup);
  popupViewReset.addEventListener('click', closePopup);

  popupNewplaceForm.addEventListener('submit', addCardFormSubmitHandler);
  popupProfileForm.addEventListener('submit', profileFormSubmitHandler);
}

setPageListeners();
cardsInit();
