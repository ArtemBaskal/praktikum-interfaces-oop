import {Popup} from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitCallback) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._formSubmitCallback = formSubmitCallback;
    this._handleSubmitBinded = this._handleSubmit.bind(this);
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    const values = this._getInputValues(evt);
    this._formSubmitCallback(values);
    this.close();
  }

  _getInputValues(evt) {
    return Array.from(evt.target.elements).filter(({tagName}) => tagName === "INPUT")
      .reduce((acc, {name, value}) => {
        acc[name] = value;
        return acc
      }, {})
  }

  _resetForm() {
    this._form.reset();
    this._form.removeEventListener('submit', this._handleSubmitBinded);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmitBinded);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._resetForm();
  }
}
