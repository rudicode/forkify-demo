import View from './View.js'
import imgIcons from 'url:../../img/icons.svg' // parcel v2

class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');
    _message = 'Recipe was successfuly uploaded';
    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');

    constructor() {
        super();
        // add listener as soon as view is created
        this._addHandlerShowWindow();
        this._addHandlerCloseWindow();

    }

    _toggleWindow() {
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }

    _addHandlerShowWindow() {
        // TODO after the first submit this form gets clobbered
        // need a function here to recreate it.
        this._btnOpen.addEventListener('click', this._toggleWindow.bind(this))
    }

    _addHandlerCloseWindow() {
        this._btnClose.addEventListener('click', this._toggleWindow.bind(this))
        this._overlay.addEventListener('click', this._toggleWindow.bind(this))
    }

    _addHandlerUpload(handler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr);
            handler(data);

        })
    }

    _generateMarkup() {

    }

}


export default new AddRecipeView();