import * as model from './model.js';
import recipeView from './views/recipeView.js';

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
        recipeView.removeSpinner();
    }
};


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

    recipeView.addHandlerRender(controlRecipes); // pub/sub pattern
}
init();