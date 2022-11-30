import View from './View.js'
import previewView from './previewView.js'
import imgIcons from 'url:../../img/icons.svg' // parcel v2

class BookmarksView extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = `No bookmarks yet. Find a good recipe and bookmark it.`;
    _message = `Success message`;

    addHandlerRender(handler) {
        window.addEventListener('load', handler);
    }
    _generateMarkup() {
        return this._data
            .map(bookmark => previewView.render(bookmark, false))
            .join('')
    }
}

export default new BookmarksView();
