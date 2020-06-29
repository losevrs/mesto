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
const popupProfileSubmit = popupProfileForm.querySelector('.popup__submit');
const popupProfileReset = popupProfileForm.querySelector('.popup__reset');

const popupNewplace = document.querySelector('.popup_newplace');
const popupNewplaceForm = popupNewplace.querySelector('.popup__container');
const popupNewplaceName = popupNewplaceForm.querySelector('.popup__input_photoname');
const popupNewplaceUrl = popupNewplaceForm.querySelector('.popup__input_photourl');
const popupNewplaceSubmit = popupNewplaceForm.querySelector('.popup__submit');
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

function togglePopup(popupElement) {
  popupElement.classList.toggle('popup_opened');
}

function showProfile() {
  popupProfileName.value = profileName.textContent;
  popupProfileDescription.value = profileDesc.textContent;
  togglePopup(popupProfile);
}

function showAddCardForm() {
  popupNewplaceName.value = "";
  popupNewplaceUrl.value = "";
  togglePopup(popupNewplace);
}

function showPhotoView(evt) {
  const imageurl = evt.currentTarget.style.backgroundImage.split("\"")[1];
  if (imageurl) {
    popupView.querySelector('.popup__image').src = imageurl;
  }
  popupView.querySelector('.popup__imagetitle').textContent = evt.currentTarget.closest(".photocard").querySelector(".photocard__placename").textContent;
  togglePopup(popupView);
}

function closePopup(evt){
  togglePopup(evt.currentTarget.closest(".popup"));
}

//Обработка лайка на карточке
function toggleLike(evt) {
  evt.currentTarget.classList.toggle('photocard__like_on');
  evt.stopPropagation();
}

//Обработка делита карточки
function deleteCard(evt) {
  evt.currentTarget.closest(".photocard").remove();;
  evt.stopPropagation();
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

function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileDesc.textContent = popupProfileDescription.value;
  closePopup(evt);
}

function addCardFormSubmitHandler(evt) {
  evt.preventDefault();
  placesPhotosContainer.insertBefore(createCard(popupNewplaceName.value, popupNewplaceUrl.value), placesPhotosContainer.firstElementChild);
  closePopup(evt);
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
