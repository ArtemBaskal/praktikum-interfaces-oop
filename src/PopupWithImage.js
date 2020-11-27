import {Popup} from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector, src, name) {
    super(popupSelector);
    this._src = src;
    this._name = name;

    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__caption');
  }

  _setImageSrc(src) {
    this._image.src = src;
  };

  _setImageCaption(name) {
    this._caption.textContent = name;
  }

  _setContent(src, name) {
    this._setImageSrc(src)
    this._setImageCaption(name);
  }

  open() {
    super.open();
    this._setContent(this._src, this._name);
  }

  close() {
    super.close();

    const defaultSrc = '/';
    const defaultCaption = '';
    this._setContent(defaultSrc, defaultCaption);
  }
}
