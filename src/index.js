import './index.css';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import {PopupWithForm} from "./PopupWithForm";
import {PopupWithImage} from "./PopupWithImage";
import {UserInfo} from "./UserInfo";

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

const placesWrap = document.querySelector('.places__list');

const renderCard = (data, wrap) => {
  const cardSelector = '.card-template';
  const handleCardClick = (src, name) => {
    const popup = new PopupWithImage('.popup_type_image', src, name);
    popup.open();
  }

  const card = new Card(data, cardSelector, handleCardClick);
  wrap.prepend(card.getView());
};

// Инициализация
const section = new Section({
  items: initialCards, renderer: (data) => {
    return renderCard(data, placesWrap);
  }
}, '.content');

section.render();

const formSubmitCallback = (values) => {
  const userInfo = new UserInfo({nameSelector: '.profile__title', descriptionSelector: '.profile__description'});
  userInfo.setUserInfo(values);
}
const cardFormSubmitCallback = (values) => {
  const {'place-name': name, link} = values;
  renderCard({name, link}, placesWrap);
}

const formSubmit = new PopupWithForm('.popup_type_edit', formSubmitCallback);
const cardFormSubmit = new PopupWithForm('.popup_type_new-card', cardFormSubmitCallback);
new FormValidator('.popup_type_edit').enableValidation();
new FormValidator('.popup_type_new-card').enableValidation();

const openEditFormButton = document.querySelector('.profile__edit-button');
const openCardFormButton = document.querySelector('.profile__add-button');

openEditFormButton.addEventListener('click', () => formSubmit.open());
openCardFormButton.addEventListener('click', () => cardFormSubmit.open());

