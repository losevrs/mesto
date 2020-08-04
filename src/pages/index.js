'use strict';
import './index.css'

import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components//FormValidator.js';
import {initialCards, cardSelector, validationSettings} from '../utils/initdata.js';

// Секция для фоток
function createNewCard(item) {
  const newCard = new Card(item, cardSelector, (event, viewportDescription) => {
    const {srcViewport, altViewport} = viewportDescription;
    const imageData = {
      src: srcViewport,
      alt: altViewport
    }
    imageViewPopup.open(imageData);
  });
  return newCard.getCard();
}

const cardsInit = {
  items: initialCards,
  renderer: (items, container) => {
    items.forEach((item) => {
      container.append(createNewCard(item));
    })
  }
}

const placesPhotos = new Section(cardsInit,'.placesphotos');

// Отображение данных профиля
const userInfo = new UserInfo({name: '.profile__name',
                               description: '.profile__description'});

UserInfo.addButton.addEventListener('click', () => {
  validationMewplace.clearPopupForm();
  popupNewplace.open();
});

UserInfo.editButton.addEventListener('click',() => {
  const profileData = userInfo.getUserInfo();
  popupProfile.setInputValues( [profileData.name, profileData.description] );
  validationProfile.clearPopupForm();
  popupProfile.open();
});

// Редактирование рофиля с валидацией
const popupProfile = new PopupWithForm('.popup_profileedit', (event, inputValues) => {
  event.preventDefault();
  const { name, description } = inputValues;
  userInfo.setUserInfo({'name': name,
                        'description': description});
  popupProfile.close();
});

const validationProfile = new FormValidator(validationSettings, popupProfile.getPopup());

popupProfile.preparePopup();
validationProfile.enableValidation();

// Добавление карточки с валидацией
const popupNewplace = new PopupWithForm('.popup_newplace', (event, inputValues) => {
  event.preventDefault();
  const { photoname, photourl } = inputValues;
  const item = {name: photoname,
                link: photourl}
  placesPhotos.addItem(createNewCard(item));
  popupNewplace.close();
});

const validationMewplace = new FormValidator(validationSettings, popupNewplace.getPopup());

popupNewplace.preparePopup();
validationMewplace.enableValidation();

// Просмотр фото карточки
const imageViewPopup = new PopupWithImage('.popup_view');
imageViewPopup.preparePopup();

// Инициализация
placesPhotos.renderItems();


