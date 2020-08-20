'use strict';
import './index.css'

import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import PopupConfirm from '../components/PopupConfirm.js';
import { cardSelector, validationSettings } from '../utils/initdata.js';

import Api from '../components/Api.js';
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14/',
  headers: {
    authorization: '44e5d6af-1500-4757-9283-b4dfbe9e13fc',
    'Content-Type': 'application/json'
  }
});
import { data } from 'autoprefixer';

// Отображение данных профиля
const userInfo = new UserInfo({
  name: '.profile__name',
  about: '.profile__about',
  avatar: '.profile__avatar'
});

const editButton = UserInfo.profileSection.querySelector('.profile__editbutton');
const addButton = UserInfo.profileSection.querySelector('.profile__addbutton');

function openEditor(popup, validator = null, values = []) {
  const profileData = userInfo.getUserInfo();
  const initParametrs = [];
  values.forEach(value => initParametrs.push(profileData[value]));
  popup.setInputValues(initParametrs);
  if (validator) {
    validator.clearPopupForm();
  }
  popup.open();
}

userInfo.getAvatarElement().addEventListener('click', () => {
  openEditor(popupAvaEditor, validationAvatar, ['avatar']);
});

editButton.addEventListener('click', () => {
  openEditor(popupProfile, validationProfile, ['name', 'about']);
});

addButton.addEventListener('click', () => {
  validationNewplace.clearPopupForm();
  popupNewPlace.open();
});

// Подтверждение удаления
const popupConfirm = new PopupConfirm('.popup_confirm', function () {
  const cardId = this.getReferer().getAttribute('data-id');
  api.deleteCard(cardId)
    .then(() => {
      this.getReferer().remove();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      this.close();
    });
});
popupConfirm.setEventListeners();

// Секция для фоток
function createNewCard(item, id) {
  const newCard = new Card(item, cardSelector, id, popupConfirm,
    (viewportDescription) => {
      const { srcViewport, altViewport } = viewportDescription;
      const imageData = {
        src: srcViewport,
        alt: altViewport
      }
      imageViewPopup.open(imageData);
    },
    (cardId, likeOn = true) => {
      return api.like(cardId, likeOn)
        .then(data => {
          if (data) {
            return data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  return newCard.getCard();
}

// Инициализация секции
const cardsInit = {
  'renderer': function renderer(item) {
    this.addItem(createNewCard(item, userInfo.getMyId()));
  }
}

let placesPhotos = null;

function setCardInSection() {
  api.getInitialCards()
    .then(data => {
      cardsInit['items'] = data;
      placesPhotos = new Section(cardsInit, '.placesphotos');
      placesPhotos.renderItems();
    })
    .catch((err) => {
      console.log(err);
    });
}

api.getUserInfo()
  .then(data => userInfo.setUserInfo(data)) // Сначала профиль
  .then(setCardInSection) // Потом карточки. Иначе нет _id пользователя (для удаления).
  .catch((err) => {
    console.log(err);
  });

// Редактирование профиля с валидацией
const popupProfile = new PopupWithForm('.popup_profileedit', (inputValues) => {
  const { name, about } = inputValues;
  api.saveProfile({ 'name': name, 'about': about })
    .then((data) => {
      const { name, about } = data;
      userInfo.editUserInfo({ 'name': name, 'about': about });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupProfile.close();
    });
  validationProfile.submitButtonDisable(true);
});
popupProfile.setEventListeners();

const validationProfile = new FormValidator(validationSettings, popupProfile.getPopup());
validationProfile.enableValidation();

// Добавление карточки с валидацией
const popupNewPlace = new PopupWithForm('.popup_newplace', (inputValues) => {
  const { photoName, photoUrl } = inputValues;
  const item = {
    name: photoName,
    link: photoUrl
  };
  api.saveCard(item)
    .then((data) => {
      if (data) {
        placesPhotos.addItem(createNewCard(data, userInfo.getMyId()));
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupNewPlace.close();
    }
    );
  validationNewplace.submitButtonDisable(true);
});
popupNewPlace.setEventListeners();

const validationNewplace = new FormValidator(validationSettings, popupNewPlace.getPopup());
validationNewplace.enableValidation();

// Просмотр фото карточки
const imageViewPopup = new PopupWithImage('.popup_view');
imageViewPopup.setEventListeners();

// Редактор аватара
const popupAvaEditor = new PopupWithForm('.popup_newavatar', (inputValues) => {
  const { avatar } = inputValues;

  api.saveAvatar({ 'avatar': avatar })
    .then((data) => {
      if (data) {
        userInfo.editUserInfo({ 'avatar': data.avatar });
        validationAvatar.submitButtonDisable(true);
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvaEditor.close();
    });
});
popupAvaEditor.setEventListeners();

const validationAvatar = new FormValidator(validationSettings, popupAvaEditor.getPopup());
validationAvatar.enableValidation();
