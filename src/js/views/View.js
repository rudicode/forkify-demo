// use parcel v2 to import paths to resources
import imgIcons from 'url:../../img/icons.svg' // parcel v2
// console.log(imgIcons); // this is the path to the icons in /dist directory

export default class View {
    _data;

    // Public

    render(data, render = true) {
        // console.log('view: ', data);
        // if no data or data is an empty array
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
        this._data = data;
        const markup = this._generateMarkup();

        if (!render) return markup; // just return the markup

        // insert markup into dom
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    // update only changed text and attributes
    // this is not very efficient but ok for this type of application
    update(data) {
        // if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
        this._data = data;
        const newMarkup = this._generateMarkup();
        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const curElements = Array.from(this._parentElement.querySelectorAll('*'));
        // console.log(curElements, newElements);
        newElements.forEach((newEl, i) => {
            const curEl = curElements[i];
            // console.log(curEl, newEl.isEqualNode(curEl));

            // only update changes to text
            if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
                // console.log(`updating text: ${newEl.textContent}`);
                curEl.textContent = newEl.textContent;
            }

            // only update changed attributes
            if (!newEl.isEqualNode(curEl)) {
                // console.log(newEl.attributes);
                // console.log(Array.from(newEl.attributes));
                Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));

            }
        })
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