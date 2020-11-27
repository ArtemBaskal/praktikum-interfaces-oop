import {Popup} from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector, src, name) {
    super(popupSelector);
    this.src = src;
    this.name = name;
  }

  open() {
    this.popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));

    this.popup.querySelector('.popup__image').src = this.src;
    this.popup.querySelector('.popup__caption').textContent = this.name;
  }
}
