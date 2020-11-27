export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupContent = this._popup.querySelector('.popup__content');
        this._popupCloseElement = this._popup.querySelector('.popup__close');

        this._openFlagClass = 'popup_is-opened';
        this._handleEscCloseBinded = this._handleEscClose.bind(this);
        this._closeBinded = this.close.bind(this);
    }

    open() {
        this._popup.classList.add(this._openFlagClass);
        this.setEventListeners();
    }

    close() {
        this._popup.classList.remove(this._openFlagClass);
        this.removeEventListeners();
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

  _handleOverlayClick() {
    const onClick = (evt) => {
      if (!this._popupContent.contains(evt.target)) {
        this._popup.removeEventListener("click", onClick);
        this.close()
      }
    };

    this._popup.addEventListener("click", onClick);
  }

  setEventListeners() {
        this._popupCloseElement.addEventListener('click', this._closeBinded);
        document.addEventListener('keydown', this._handleEscCloseBinded);
        this._handleOverlayClick();
  }

  removeEventListeners() {
        this._popupCloseElement.removeEventListener('click', this._closeBinded);
        document.removeEventListener('keydown', this._handleEscCloseBinded);
  }
}
