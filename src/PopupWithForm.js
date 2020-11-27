import {Popup} from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitCallback) {
    super(popupSelector);
    this.setEventListeners();
    this.formSubmitCallback = formSubmitCallback;
  }

  _getInputValues(evt) {
    /* TODO: simplify? */
    return Array.from(evt.target.elements).filter(({tagName}) => tagName === "INPUT")
      .reduce((acc, {name, value}) => {
        acc[name] = value;
        return acc
      }, {})
  }

  _onSubmit(evt) {
    const values = this._getInputValues(evt);
    this.formSubmitCallback(values);
    this.close();
  };

  setEventListeners() {
    super.setEventListeners();
    this.popup.addEventListener('submit', (evt) => this._onSubmit(evt));
  }

  close() {
    this.popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', () => this._handleEscClose());

    this.popup.removeEventListener('submit', this._onSubmit);
    this.popup.querySelector('.popup__form').reset();
  }
}
