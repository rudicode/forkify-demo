// use parcel v2 to import paths to resources
import imgIcons from 'url:../../img/icons.svg' // parcel v2
// console.log(imgIcons); // this is the path to the icons in /dist directory
import { Fraction } from 'fractional';

// console.log((new Fraction(7,3)).toString() );

class RecipeView {
    #parentElement = document.querySelector('.recipe');
    #data;
    render(data) {
        this.#data = data;
        const markup = this.#generateMrkup();
        this.#clear();
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderSpinner() {
        // recipe__fig
        const markup = `
            <div class="spinner">
                <svg>
                    <use href="${imgIcons}#icon-loader"></use>
                </svg>
            </div>`;
        this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    removeSpinner() {
        document.querySelector('.spinner')?.remove(); // remove spinner if it exists
    }

    #clear() {
        this.#parentElement.innerHTML = '';
    }

    #generateMrkup() {
        return `
            <figure class="recipe__fig">
          <img src="${this.#data.image}" alt="${this.#data.title}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this.#data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${imgIcons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${this.#data.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${imgIcons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${this.#data.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${imgIcons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${imgIcons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${imgIcons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${imgIcons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${this.#generateMarkupIngredientList()}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${this.#data.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this.#data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${imgIcons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`;
    }

    #generateMarkupIngredientList() {
        return this.#data.ingredients.map(ing => this.#generateMrkupIngredient(ing)).join('\n')
    }

    #generateMrkupIngredient(ing) {
        return `
                <li class="recipe__ingredient">
                  <svg class="recipe__icon">
                    <use href="${imgIcons}#icon-check"></use>
                  </svg>
                  <div class="recipe__quantity">${this.#toFraction(ing.quantity)}</div>
                  <div class="recipe__description">
                    <span class="recipe__unit">${ing.unit}</span>
                    ${ing.description}
                  </div>
                </li>
                `
    }

    #toFraction(num) {
        return num ? (new Fraction(num).toString()) : ''
    }
}

export default new RecipeView();
