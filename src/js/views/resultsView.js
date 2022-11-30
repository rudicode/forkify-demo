import View from './View.js'
import previewView from './previewView.js'
import imgIcons from 'url:../../img/icons.svg' // parcel v2

class ResultsView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = `No recipes found. Please try again.`;
    _message = `Success message`;

    _generateMarkup() {
        return this._data
            .map(result => previewView.render(result, false))
            .join('')
    }
}

export default new ResultsView(); // only one instance of this view