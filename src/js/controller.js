import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import pagenationView from './views/pagenationView.js';

// polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// parcel hot reload
// TODO find out why this causes multiple calls to controlRecipes() and possibly others
// if (module.hot) {
//     module.hot.accept();
// }

///////////////////////////////////////
///////////////////////////////////////

const controlRecipes = async function () {
    try {
        const hashId = window.location.hash.slice(1);
        // console.log('hashID: ',hashId);
        if (!hashId) return;
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
        if (!query) return;

        resultsView.renderSpinner();

        await model.loadSearchResults(query);

        resultsView.render(model.getSearchResultsPage(1));
        pagenationView.render(model.state.search);
        console.log(`controlLoadSearchResults: `,model.state);
    } catch (err) {
        console.error(`Error: controlLoadSearchResults(), ${err.message}`);
    }
};

const controlPagenation = function (page) {
    // console.log(`controlPagenation() page: ${page}`);
    if (!Number.isFinite(page)) return;
    resultsView.render(model.getSearchResultsPage(page));
    pagenationView.render(model.state.search);
}

const controlServings = function (newServings) {
    model.updateServings(newServings);     // update recipe servings in the state
    recipeView.update(model.state.recipe); // update the recipe view
}

//
// App setup
//

const init = function () {

    console.log('Game ON!!');

    // pre-fill cache with known recipes
    model.preFillRecipeCache();

    // pub/sub event handlers
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    searchView.addHandlerSearch(controlLoadSearchResults);
    pagenationView.addHandlerClick(controlPagenation);

    // model.loadSearchResults('pizza');
}
init();