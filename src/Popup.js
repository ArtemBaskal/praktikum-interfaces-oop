export class Popup {
    /* TODO: rename to private props */
    constructor(popupSelector) {
        this.popup = document.querySelector(popupSelector);
        this.closeIcon = this.popup.querySelector('.popup__close');
        this.setEventListeners();
    }

    open() {
        this.popup.classList.add('popup_is-opened');
        document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
    }

    close() {
        this.popup.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        this.closeIcon.addEventListener('click', () => this.close());
    }
}
