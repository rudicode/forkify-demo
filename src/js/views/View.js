// use parcel v2 to import paths to resources
import imgIcons from 'url:../../img/icons.svg' // parcel v2
// console.log(imgIcons); // this is the path to the icons in /dist directory

export default class View {
    _data;

    // Public

    render(data) {
        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderSpinner() {
        // recipe__fig
        const markup = `
            <div class="spinner">
                <svg>
                    <use href="${imgIcons}#icon-loader"></use>
                </svg>
            </div>`;
        // this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    removeSpinner() {
        document.querySelector('.spinner')?.remove(); // remove spinner if it exists
    }

    renderMessage(message = this._message) {
        const markup = `
            <div class="message">
                <div>
                    <svg>
                        <use href="${imgIcons}#icon-smile"></use>
                    </svg>
                </div>
            <p>${message}</p>
            </div>
          `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderError(message = this._errorMessage) {
        const markup = `
            <div class="error">
                <div>
                    <svg>
                        <use href="${imgIcons}#icon-alert-triangle"></use>
                    </svg>
                </div>
            <p>${message}</p>
            </div>
          `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    //
    // Private
    //

    _clear() {
        this._parentElement.innerHTML = '';
    }
}