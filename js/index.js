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
const popupViewReset = popupView.querySelector('.popup__reset');

const profileSection = document.querySelector('.profile');

const editButton = profileSection.querySelector('.profile__editbutton');
const addButton = profileSection.querySelector('.profile__addbutton');

const profileName = profileSection.querySelector('.profile__name');
const profileDesc = profileSection.querySelector('.profile__description')

const placesPhotosContainer = document.querySelector('.placesphotos');

const cardTemplate = document.querySelector('#card').content;

function addPopup(popupElement) {
  if (!popupElement.classList. contains('popup_opened')) {
    popupElement.classList.add('popup_opened');
  }
}

function removePopup(popupElement) {
  if (popupElement.classList.contains('popup_opened')) {
    popupElement.classList.remove('popup_opened');
  }
}

function showProfile() {
  popupProfileName.value = profileName.textContent;
  popupProfileDescription.value = profileDesc.textContent;
  addPopup(popupProfile);
}

function showAddCardForm() {
  popupNewplaceForm.reset();
  addPopup(popupNewplace);
}

function showPhotoView(event) {
  const imageUrl = event.currentTarget.style.backgroundImage.split("\"")[1];
  if (imageurl) {
    popupView.querySelector('.popup__image').src = imageUrl;
  }
  popupView.querySelector('.popup__imagetitle').textContent = event.currentTarget.closest(".photocard").querySelector(".photocard__placename").textContent;
  addPopup(popupView);
}

function closePopup(event){
  removePopup(event.currentTarget.closest(".popup"));
}

//Обработка лайка на карточке
function toggleLike(event) {
  event.currentTarget.classList.toggle('photocard__like_on');
  event.stopPropagation();
}

//Обработка делита карточки
function deleteCard(event) {
  event.currentTarget.closest(".photocard").remove();;
  event.stopPropagation();
}

// Создание карточки из шаблона
function createCard (description, photoUrl) {

  const elementCard = cardTemplate.cloneNode(true);

  const viewPort = elementCard.querySelector('.photocard__viewport');
  viewPort.style.backgroundImage = `url('${photoUrl}')`;
  viewPort.addEventListener('click', showPhotoView);

  const deleteButton = elementCard.querySelector('.photocard__delete');
  deleteButton.addEventListener('click', deleteCard);

  const cardPlaceName = elementCard.querySelector('.photocard__placename');
  cardPlaceName.textContent = description;

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
  event.preventDefault();
  placesPhotosContainer.insertBefore(createCard(popupNewplaceName.value, popupNewplaceUrl.value), placesPhotosContainer.firstElementChild);
  closePopup(event);
}

// Инициализация

function cardsInit() {
  initialCards.forEach((item) => {placesPhotosContainer.appendChild(createCard(item.name, item.link));});
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
