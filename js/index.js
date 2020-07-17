'use strict';

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

function closeOpenedPopup() {
  const openedPopup =document.querySelector('.popup_opened');
  if (openedPopup) {
    closePopup(openedPopup);
  }
}

function closeOnEsc(event) {
  if (event.key === 'Escape') {
    closeOpenedPopup();
  }
}

function closePopup(popupElement) {
  if (popupElement.classList.contains('popup_opened')) {
    popupElement.classList.remove('popup_opened');
  }
  document.removeEventListener('keydown', closeOnEsc);
}

function openPopup(popupElement) {
  if (!popupElement.classList.contains('popup_opened')) {
    popupElement.classList.add('popup_opened');
  }
  document.addEventListener('keydown', closeOnEsc);
}

function showProfile() {
  popupProfileName.value = profileName.textContent;
  popupProfileDescription.value = profileDesc.textContent;
  clearPopupForm(popupProfile);
  openPopup(popupProfile);
}

function showAddCardForm() {
  popupNewplaceForm.reset();
  clearPopupForm(popupNewplace);
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
  elementCard.querySelector('.photocard__viewport').removeEventListener('click', showPhotoView);
  elementCard.querySelector('.photocard__delete').removeEventListener('click', deleteCard);
  elementCard.querySelector('.photocard__like').removeEventListener('click', toggleLike);
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
  closePopup(popupProfile);
}

function addCardFormSubmitHandler(event) {
  const cardData = {
    name: popupNewplaceName.value,
    link: popupNewplaceUrl.value
  };
  event.preventDefault();
  placesPhotosContainer.prepend(createCard(cardData));
  closePopup(popupNewplace);
}

function closeOnMouseDownHandler(event) {
  const yesClose = targetsForClose.some((element) => {
      return event.target.classList.contains(element);});
  if (yesClose) {
    closeOpenedPopup();
  }
}

// Инициализация

initialCards.forEach((item) => {
    placesPhotosContainer.appendChild(createCard(item));
});

editButton.addEventListener('click', showProfile);
addButton.addEventListener('click', showAddCardForm);

document.addEventListener('mousedown', closeOnMouseDownHandler);

popupNewplaceForm.addEventListener('submit', addCardFormSubmitHandler);
popupProfileForm.addEventListener('submit', profileFormSubmitHandler);


