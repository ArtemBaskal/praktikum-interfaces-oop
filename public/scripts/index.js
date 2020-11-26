import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';

class Popup {
  /* TODO: rename to private props */
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
    this.closeIcon = this.popup.querySelector('.popup__close');
    this.setEventListeners();
  }

  open = () => {
    this.popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close = () => {
    this.popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners(){
    this.closeIcon.addEventListener('click', this.close);
  }
}

class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitCallback) {
    super(popupSelector);
    this.setEventListeners();
    this.formSubmitCallback = formSubmitCallback;
  }

  _getInputValues(evt) {
    /* TODO: simplify? */
    return Array.from(evt.target.elements).filter(({tagName}) => tagName === "INPUT")
      .reduce((acc, { name, value }) => {
        acc[name] = value;
        return acc
      }, {})
  }

   _onSubmit = (evt) => {
    debugger
    const values = this._getInputValues(evt);
    this.formSubmitCallback(values);
    this.close();
  };

  setEventListeners() {
    super.setEventListeners();
    this.popup.addEventListener('submit', this._onSubmit);
  }

  close = () => {
    this.popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this._handleEscClose);

    this.popup.removeEventListener('submit', this._onSubmit);
    this.popup.querySelector('.popup__form').reset();
  }
}

class PopupWithImage extends Popup {
  constructor(popupSelector, src, name) {
    super(popupSelector);
    this.src = src;
    this.name = name;
  }

  open = () => {
    this.popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscClose);

    this.popup.querySelector('.popup__image').src = this.src;
    this.popup.querySelector('.popup__caption').textContent = this.name;
  }
}

class UserInfo {
  constructor({nameSelector, descriptionSelector}) {
    this.name = document.querySelector(nameSelector);
    this.description = document.querySelector(descriptionSelector);
  }

  /* TODO: fill in form on open? */
  getUserInfo() {
    return {
      name: this.name,
      description: this.description,
    }
  }

  /**
   * @param name {string}
   * @param description {sring}
   */
  setUserInfo({name, description}) {
    this.name.textContent = name;
    this.description.textContent = description;
  }
}

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
  const { 'place-name': name, link } = values;
  renderCard({name, link}, placesWrap);
}

const formSubmit = new PopupWithForm('.popup_type_edit', formSubmitCallback);
const cardFormSubmit = new PopupWithForm('.popup_type_new-card', cardFormSubmitCallback);
new FormValidator('.popup_type_edit').enableValidation();
new FormValidator('.popup_type_new-card').enableValidation();

const openEditFormButton = document.querySelector('.profile__edit-button');
const openCardFormButton = document.querySelector('.profile__add-button');

openEditFormButton.addEventListener('click', formSubmit.open);
openCardFormButton.addEventListener('click', cardFormSubmit.open);

