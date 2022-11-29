import View from './View.js'
import imgIcons from 'url:../../img/icons.svg' // parcel v2

class PreviewView extends View {
    _parentElement = '';

    //
    // Private
    //

    _generateMarkup() {
        const item = this._data;
        const id = window.location.hash.slice(1);
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

export default new PreviewView();