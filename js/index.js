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
const popupView = popupSection.querySelector('.popup__photoview');

const popupCancel = popupSection.querySelectorAll('.popup__reset');
const popupSubmit = popupSection.querySelector('.popup__submit');

const popupName = popupSection.querySelector('.popup__input_name');
const popupDesc = popupSection.querySelector('.popup__input_description');

const profileSection = document.querySelector('.profile');

const editButton = profileSection.querySelector('.profile__editbutton');
const addButton = profileSection.querySelector('.profile__addbutton');

const profileName = profileSection.querySelector('.profile__name');
const profileDesc = profileSection.querySelector('.profile__description')

const placesphotosContainer = document.querySelector('.placesphotos');
const cardTemplate = document.querySelector('#card').content;


//Выбор в попапе между формой и вьюхой (ну и вкл - выкл)
function switchTo(element) {
  switch (element) {
    case "Form":
      popupForm.style.display="flex";
      popupView.style.display="none";
      popupSection.classList.remove("popup_view");
      break;
    case "View":
      popupForm.style.display="none";
      popupView.style.display="flex";
      popupSection.classList.add("popup_view");
      break;
    case "None":
      popupForm.style.display="none";
      popupView.style.display="none";
      break;
    case "All":
      popupForm.style.display="flex";
      popupView.style.display="flex";
      break;
    }
}

//Показываем если закрыт - скрываем если открыт popup
function showHidePopup(evt) {
  let taskType = "closepopup";
  let popupTitle = popupForm.querySelector('.popup__title');
  let imageurl = null;

  //Если закрываем по сабмиту - ивент не нужен
  if (evt) {
    taskType = evt.currentTarget.getAttribute("data-task");
  }

  switch (taskType) {
    case "editprofile":
      popupTitle.textContent = "Редактировать профиль";
      popupName.placeholder = "Имя";
      popupDesc.placeholder = "Описание";
      popupName.value = profileName.textContent;
      popupDesc.value = profileDesc.textContent;
      popupForm.setAttribute("data-task", "saveprofile");
      switchTo("Form");
      break;
    case "addcard":
      popupTitle.textContent = "Новое место";
      popupName.placeholder = "Название";
      popupDesc.placeholder = "Ссылка на картинку";
      popupName.value = "";
      popupDesc.value = "";
      popupForm.setAttribute("data-task", "addcard");
      switchTo("Form");
      break;
    case "photoview":
      imageurl = evt.currentTarget.style.backgroundImage.split("\"");
      popupView.querySelector('.popup__image').src = imageurl[1];
      popupView.querySelector('.popup__imagetitle').textContent = evt.currentTarget.closest(".photocard").querySelector(".photocard__placename").textContent;
      switchTo("View");
      break;
    case "closepopup":
      switchTo("None");
      break;
  }

  popupSection.classList.toggle('popup_opened');
}

//Обработка лайка
function toggleLike(evt) {
  evt.currentTarget.classList.toggle('photocard__like_on');
  evt.stopPropagation();
}

//и делита
function deleteCard(evt) {
  evt.currentTarget.closest(".photocard").remove();;
  evt.stopPropagation();
}

// Создание карточки
function createCard (description, photoUrl) {
  //Создаем карточку из шаблона
  const elementCard = cardTemplate.cloneNode(true);

  //и добавляем в нее фотоку и на кнопку удаления обработчик
  const viewPort = elementCard.querySelector('.photocard__viewport');
  viewPort.style.backgroundImage = `url('${photoUrl}')`;
  viewPort.addEventListener('click', showHidePopup);

  const deleteButton = elementCard.querySelector('.photocard__delete');
  deleteButton.addEventListener('click', deleteCard);

  //Добавим описание и обработку лайкоа
  const cardPlaceName = elementCard.querySelector('.photocard__placename');
  cardPlaceName.textContent = description;

  const likeButton = elementCard.querySelector('.photocard__like');
  likeButton.addEventListener('click', toggleLike);

  return elementCard;
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  let popupTask = evt.currentTarget.getAttribute("data-task");

  switch (popupTask) {
    case "saveprofile":
      profileName.textContent = popupName.value;
      profileDesc.textContent = popupDesc.value;
      break;
    case "addcard":
      placesphotosContainer.insertBefore(createCard(popupName.value, popupDesc.value), placesphotosContainer.firstElementChild);
      break;
  }

  showHidePopup();
}

function cardsInit() {
  initialCards.forEach((item) => {placesphotosContainer.appendChild(createCard(item.name, item.link));});
}

//Вешаем обработчики на элементы формы
editButton.addEventListener('click', showHidePopup);
addButton.addEventListener('click', showHidePopup);
popupCancel.forEach((element) => element.addEventListener('click', showHidePopup));
popupForm.addEventListener('submit', formSubmitHandler);
cardsInit();
