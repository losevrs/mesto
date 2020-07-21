'use strict';

import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {validationSettings, initialCards, targetsForClose} from './initdata.js';

const popupProfile = document.querySelector('.popup_profileedit');
const popupProfileForm = popupProfile.querySelector('.popup__container');
const popupProfileName = popupProfileForm.querySelector('.popup__input_name');
const popupProfileDescription = popupProfileForm.querySelector('.popup__input_description');

const popupNewplace = document.querySelector('.popup_newplace');
const popupNewplaceForm = popupNewplace.querySelector('.popup__container');
const popupNewplaceName = popupNewplaceForm.querySelector('.popup__input_photoname');
const popupNewplaceUrl = popupNewplaceForm.querySelector('.popup__input_photourl');

const popupView = document.querySelector('.popup_view');
const popupViewImage = popupView.querySelector('.popup__image');
const popupViewImageTitle = popupView.querySelector('.popup__imagetitle');

const profileSection = document.querySelector('.profile');

const editButton = profileSection.querySelector('.profile__editbutton');
const addButton = profileSection.querySelector('.profile__addbutton');

const profileName = profileSection.querySelector('.profile__name');
const profileDesc = profileSection.querySelector('.profile__description')

const placesPhotosContainer = document.querySelector('.placesphotos');

function closeOpenedPopup() {
  const openedPopup =document.querySelector('.popup_opened');
  closePopup(openedPopup);
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

  const formValidatorForProfile = new FormValidator(validationSettings, popupProfile);
  formValidatorForProfile.enableValidation();

  openPopup(popupProfile);
}

function showAddCardForm() {
  popupNewplaceForm.reset();

  const formValidatorForNewplace = new FormValidator(validationSettings, popupNewplace);
  formValidatorForNewplace.enableValidation();

  openPopup(popupNewplace);
}

function showPhotoView(event) {
  popupViewImage.src = event.target.src;
  popupViewImageTitle.textContent = event.target.alt;
  openPopup(popupView);
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
  const newCard = new Card(cardData, '#card');
  placesPhotosContainer.prepend(newCard.getCard(showPhotoView));
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
    const newCard = new Card(item, '#card');
    placesPhotosContainer.append(newCard.getCard(showPhotoView));
});

editButton.addEventListener('click', showProfile);
addButton.addEventListener('click', showAddCardForm);

document.addEventListener('mousedown', closeOnMouseDownHandler);

popupNewplaceForm.addEventListener('submit', addCardFormSubmitHandler);
popupProfileForm.addEventListener('submit', profileFormSubmitHandler);


