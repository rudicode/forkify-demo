import View from './View.js'
import imgIcons from 'url:../../img/icons.svg' // parcel v2
import { mark } from 'regenerator-runtime';

class ResultsView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = `No recipes found. Please try again.`;
    _message = `Success message`;

    //
    // Private
    //

    _generateMarkup() {
        // console.log(this._data);
        // for (const item of this._data) 
        const numberOfResultsFound = `
        <li class="preview" style="margin-left: 11em">
            <div class="preview__data">
                <h4 class="preview__title">Found ${this._data.length} recipes.</h4>
            </div>
        </li>
        `
        const markup = this._data.map(this._generateMarkupPreview).join('\n');
        return `${numberOfResultsFound}\n${markup}`;
    }

    _generateMarkupPreview(item) {
        return ` 
            <li class="preview">
                <a class="preview__link" href="#${item.id}">
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