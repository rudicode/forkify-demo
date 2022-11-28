import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

// polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';

///////////////////////////////////////
///////////////////////////////////////

const controlRecipes = async function () {
    try {
        const hashId = window.location.hash.slice(1);
        // console.log('hashID: ',hashId);
        if(!hashId) return;
        recipeView.renderSpinner(); // BUG: not showing up for long

        // 1) Load Recipe
        await model.loadRecipe(hashId); // remember loadRecipe is asysnc, so await

        // 2) Render view
        recipeView.render(model.state.recipe);

    } catch (err) {
        console.error(`Error: $controlRecipes(), ${err.message}`);
        recipeView.renderError();
    }
};

const controlLoadSearchResults = async function () {
    try {
        const query = searchView.getQuery();
        if(!query) return;

        searchView.clear();
        await model.loadSearchResults(query);
        console.log(model.state.search);
    } catch (err) {
        console.error(`Error: controlLoadSearchResults(), ${err.message}`);
    }
}


//
// Event Listeners
//

// for cache debugging only
const logoImage = document.querySelector('.header__logo');
logoImage.addEventListener('click', function(){
    model.recipeCache.log(); // output recipeCache to concole
})

//
// App setup
//

const init = function () {

    console.log('Game ON!!');

    // pre-fill cache with known recipes
    model.preFillRecipeCache();

    // pub/sub event handlers
    recipeView.addHandlerRender(controlRecipes);
    searchView.addHandlerSearch(controlLoadSearchResults);

    // model.loadSearchResults('pizza');
}
init();