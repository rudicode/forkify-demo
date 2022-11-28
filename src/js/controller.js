import * as model from './model.js';
import recipeView from './views/recipeView.js';

// polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

///////////////////////////////////////
///////////////////////////////////////

const controlRecipes = async function (useCachedOnly = false) {
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

// add the same event handler for multiple events in a loop
['hashchange', 'load'].forEach(event => window.addEventListener(event, function(){controlRecipes(true)}) );
// window.addEventListener('hashchange', function(){controlRecipes(true)});
// window.addEventListener('load', function(){controlRecipes(true)});

// for cache debugging
const logoImage = document.querySelector('.header__logo');
logoImage.addEventListener('click', function(){
    model.recipeCache.log(); // output recipeCache to concole
})

//
// App setup
//

console.log('Game ON!!');

// pre-fill cache with known recipes
model.preFillRecipeCache();
