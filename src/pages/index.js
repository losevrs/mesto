'use strict';
import './index.css'

import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards, cardSelector, validationSettings} from '../utils/initdata.js';

import {api} from '../components/Api.js'

// Секция для фоток
function createNewCard(item) {
  const newCard = new Card(item, cardSelector, (viewportDescription) => {
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
  'renderer': function renderer(item) {
      this.addItem(createNewCard(item));
  }
}
let placesPhotos = null;

// Инициализация секции
api.getInitialCards()
.then (data => {cardsInit['items'] = data;
                return cardsInit;
})
.then (data => {
  placesPhotos = new Section(data,'.placesphotos');
  placesPhotos.renderItems();
})
.catch((err) => {
  console.log(err);
});

// Отображение данных профиля
const userInfo = new UserInfo({name: '.profile__name',
                               about: '.profile__about',
                               avatar: '.profile__avatar'});
api.getUserInfo()
.then (data => userInfo.setUserInfo(data))
.catch((err) => {
  console.log(err);
});

const editButton = UserInfo.profileSection.querySelector('.profile__editbutton');
const addButton = UserInfo.profileSection.querySelector('.profile__addbutton');

userInfo.setAvatarEditor(() => {
  const profileData = userInfo.getUserInfo();
  popupAvaEditor.setInputValues( [profileData.avatar] );
  validationAvatar.clearPopupForm();
  popupAvaEditor.open();
});

addButton.addEventListener('click', () => {
  validationNewplace.clearPopupForm();
  popupNewPlace.open();
});

editButton.addEventListener('click',() => {
  const profileData = userInfo.getUserInfo();
  popupProfile.setInputValues( [profileData.name, profileData.about] );
  validationProfile.clearPopupForm();
  popupProfile.open();
});

// Редактирование рофиля с валидацией
const popupProfile = new PopupWithForm('.popup_profileedit', (inputValues) => {
  const { name, about } = inputValues;
  userInfo.setUserInfo({'name': name,
                        'about': about});
  popupProfile.close();
});

const validationProfile = new FormValidator(validationSettings, popupProfile.getPopup());

popupProfile.preparePopup();
validationProfile.enableValidation();

// Добавление карточки с валидацией
const popupNewPlace = new PopupWithForm('.popup_newplace', (inputValues) => {
  const { photoname, photourl } = inputValues;
  const item = {name: photoname,
                link: photourl}
  placesPhotos.addItem(createNewCard(item));
  popupNewPlace.close();
});

const validationNewplace = new FormValidator(validationSettings, popupNewPlace.getPopup());

popupNewPlace.preparePopup();
validationNewplace.enableValidation();

// Просмотр фото карточки
const imageViewPopup = new PopupWithImage('.popup_view');
imageViewPopup.preparePopup();

// Редактор аватара
const popupAvaEditor = new PopupWithForm('.popup_newavatar', (inputValues) => {
  const { avatar } = inputValues;
  userInfo.setUserInfo({'avatar': avatar});
  popupAvaEditor.close();
});

const validationAvatar = new FormValidator(validationSettings, popupAvaEditor.getPopup());

popupAvaEditor.preparePopup();
validationAvatar.enableValidation();





