import View from './View.js'
import imgIcons from 'url:../../img/icons.svg' // parcel v2
//import { mark } from 'regenerator-runtime'; // what is this?

class ResultsView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = `No recipes found. Please try again.`;
    _message = `Success message`;

    //
    // Private
    //

    _generateMarkup() {
        return this._data.map(this._generateMarkupPreview);
    }

    _generateMarkupPreview(item) {
        const id = window.location.hash.slice(1);
        // console.log(item.id, id);
        const highlightActive = item.id === id ? ' preview__link--active' : ''
        return ` 
            <li class="preview">
                <a class="preview__link${highlightActive}" href="#${item.id}">
                    <figure class="preview__fig">
                        <img src="${item.image}" alt="${item.title}" />
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${item.title}</h4>
                        <p class="preview__publisher">${item.publisher}</p>
                    </div>
                </a>
            </li>
        `
    }

}

export default new ResultsView(); // only one instance of this view