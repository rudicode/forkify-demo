import View from './View.js'
import imgIcons from 'url:../../img/icons.svg' // parcel v2
import { mark } from 'regenerator-runtime';

class ResultsView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = `Could not find the recipe. Please try another one.`;
    _message = `Success message`;

    //
    // Private
    //

    _generateMarkup() {
        // console.log(this._data);
        // for (const item of this._data) 
        return this._data.map(this._generateMarkupPreview).join('\n');
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