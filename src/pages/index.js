'use strict';
import './index.css'

import Card from '../js/components/Card.js';
import UserInfo from '../js/components/UserInfo.js';
import Section from '../js/components/Section.js';
import PopupWithImage from '../js/components/PopupWithImage.js';
import PopupWithForm from '../js/components/PopupWithForm.js';
import {initialCards, cardSelector} from '../js/initdata.js';

// Секция для фоток
const cardsInit = {
  items: initialCards,
  renderer: (item) => {
    const newCard = new Card(item, cardSelector, (event) => {
      const imageData = {
        src: event.target.src,
        alt: event.target.alt,
      }
      imageViewPopup.open(imageData);
    });
    return newCard.getCard();
  }
}

const placesPhotos = new Section(cardsInit,'.placesphotos');

// Отображение данных профиля
const userInfo = new UserInfo({name: '.profile__name',
                               description: '.profile__description'});

userInfo.setAddCardHandler(() => {popupNewplace.open();});

userInfo.setEditProfileHandler(() => {
  const profileData = userInfo.getUserInfo();
  popupProfile.setInputValues( [profileData.name, profileData.description] );
  popupProfile.open();
});

// Редактирование рофиля с валидацией
const popupProfile = new PopupWithForm('.popup_profileedit', (event) => {
  event.preventDefault();
  userInfo.setUserInfo({name: popupProfile.getInputValueByName('name'),
                        description: popupProfile.getInputValueByName('description')});
  popupProfile.close();
});
popupProfile.preparePopup();

// Добавление карточки с валидацией
const popupNewplace = new PopupWithForm('.popup_newplace', (event) => {
  event.preventDefault();
  placesPhotos.addItem({name: popupNewplace.getInputValueByName('photoname'),
                        link: popupNewplace.getInputValueByName('photourl')});
  popupNewplace.close();
});
popupNewplace.preparePopup();

// Просмотр фото карточки
const imageViewPopup = new PopupWithImage('.popup_view');
imageViewPopup.preparePopup();

// Инициализация
placesPhotos.renderItems();


