import './index.css';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import {PopupWithForm} from "./PopupWithForm";
import {PopupWithImage} from "./PopupWithImage";
import {UserInfo} from "./UserInfo";
import {initialCards} from "./consts";

const renderCard = (data) => {
  const handleCardClick = (src, name) => {
    const popup = new PopupWithImage('.popup_type_image', src, name);
    popup.open();
  }

  const card = new Card(data, '.card-template', handleCardClick);
  return card.getView();
};

const section = new Section({
  items: initialCards, renderer: renderCard,
}, '.places__list');
section.render();

const formSubmit = new PopupWithForm('.popup_type_edit', (values) => {
  const userInfo = new UserInfo({nameSelector: '.profile__title', descriptionSelector: '.profile__description'});
  userInfo.setUserInfo(values);
});

const cardFormSubmit = new PopupWithForm('.popup_type_new-card', (values) => {
    const {'place-name': name, link} = values;
    section.addItem({name, link});
  }
);

new FormValidator('.popup_type_edit').enableValidation();
new FormValidator('.popup_type_new-card').enableValidation();

const openEditFormButton = document.querySelector('.profile__edit-button');
const openCardFormButton = document.querySelector('.profile__add-button');

openEditFormButton.addEventListener('click', () => formSubmit.open());
openCardFormButton.addEventListener('click', () => cardFormSubmit.open());

