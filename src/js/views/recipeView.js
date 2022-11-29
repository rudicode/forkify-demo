import View from './View.js'

// use parcel v2 to import paths to resources
import imgIcons from 'url:../../img/icons.svg' // parcel v2
// console.log(imgIcons); // this is the path to the icons in /dist directory
import { Fraction } from 'fractional';

class RecipeView extends View {
    _parentElement = document.querySelector('.recipe');
    // _data;
    _errorMessage = `Could not find the recipe. Please try another one.`;
    _message = `Success message`;

    // Public

    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(event => window.addEventListener(event, handler));
    }

    addHandlerUpdateServings(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--tiny');
            if (!btn) return;

            const newServings = +btn.dataset.updateTo
            // console.log(newServings);
            handler(newServings);
        })
    }

    addHandlerAddBookmark(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--bookmark')
            if (!btn) return;
            // console.log(btn);

            handler();
        })
    }

    //
    // Private
    //

    _generateMarkup() {
        return `
            <figure class="recipe__fig">
          <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${imgIcons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${imgIcons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings" data-update-to="${this._data.servings - 1}">
                <svg>
                  <use href="${imgIcons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings" data-update-to="${this._data.servings + 1}">
                <svg>
                  <use href="${imgIcons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>
          <div class="preview__user-generated">
          </div>
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${imgIcons}#icon-bookmark${this._data.bookmarked ? '-fill' : ''}"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${this._generateMarkupIngredientList()}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${imgIcons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`;
    }

    _generateMarkupIngredientList() {
        return this._data.ingredients.map(ing => this._generateMrkupIngredient(ing)).join('\n')
    }

    _generateMrkupIngredient(ing) {
        return `
                <li class="recipe__ingredient">
                  <svg class="recipe__icon">
                    <use href="${imgIcons}#icon-check"></use>
                  </svg>
                  <div class="recipe__quantity">${this._toFraction(ing.quantity)}</div>
                  <div class="recipe__description">
                    <span class="recipe__unit">${ing.unit}</span>
                    ${ing.description}
                  </div>
                </li>
                `
    }

    _toFraction(num) {
        return num ? (new Fraction(num).toString()) : ''
    }
}

export default new RecipeView();
