import { async } from "regenerator-runtime" // TODO: verify if I need this
// import * as simpleCache from './simpleCache.js';
import { SimpleCache } from './simpleCache.js';
import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";


export const recipeCache = new SimpleCache('Recipe');
export const searchCache = new SimpleCache('Search');

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
    }
}

//
// Load
//

export const loadRecipe = async function (hashId, useCache = true) {
    // NOTE to limit API calls during development use a simple cache
    // to store returned API data
    try {
        let data;
        if (useCache) {
            data = recipeCache.find(hashId);
        }
        if(!data) {
            data = await getJSON(`${API_URL}/${hashId}`);
            recipeCache.set(data.data.recipe.id, data); // cache recipe for future
        }

        const { recipe } = data.data
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
        }
    } catch (err) {
        console.error(`Error: loadRecipe(), ${err.message}`);
        throw err;
    }
}


//
// Search
//

export const loadSearchResults = async function (query, useCache = true) {
    try {
        let data;
        state.search.query = query;
        if (useCache) {
            data = searchCache.find(query);
            // console.log(`Cache found: ${query}`);
        }
        if(!data) {
            data = await getJSON(`${API_URL}?search=${query}`);
            searchCache.set(query, data); // cache recipe for future
        }
        // console.log(data);
        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url
            }
        })
    } catch (err) {
        console.error(`Error: loadSearchResults(), ${err.message}`);
        throw err;
    }
}

// Event handler
// for cache debugging only
const logoImage = document.querySelector('.header__logo');
logoImage.addEventListener('click', function(){
    recipeCache.log();
    searchCache.log();
});

// helpers
export const preFillRecipeCache = function () {

    // pre-fill cache with known recipes
    for (const recipeData of defaultRecipes) {
        const recipe = JSON.parse(recipeData);
        recipeCache.set(recipe.data.recipe.id, recipe, false);
    }
    // recipeCache.log();
    searchCache.set(searchNames[0], JSON.parse(searchResults[0]))
}










//
//
// default Data
//
//
// NOTE any results from the API can be copied here.
// this data still needs JASON.parse() (see preFillRecipeCache())
const defaultRecipes =
    [
        `{"status":"success","data":{"recipe":{"publisher":"All Recipes","ingredients":[{"quantity":1,"unit":"","description":"pre-baked pizza crust"},{"quantity":0.5,"unit":"cup","description":"pesto"},{"quantity":1,"unit":"","description":"ripe tomato chopped"},{"quantity":0.5,"unit":"cup","description":"green bell pepper chopped"},{"quantity":1,"unit":"","description":"can chopped black olives drained"},{"quantity":1,"unit":"","description":"small red onion chopped"},{"quantity":1,"unit":"","description":"can artichoke hearts drained and sliced"},{"quantity":1,"unit":"cup","description":"crumbled feta cheese"}],"source_url":"http://allrecipes.com/Recipe/Pesto-Pizza-2/Detail.aspx","image_url":"http://forkify-api.herokuapp.com/images/104254d419.jpg","title":"Pesto Pizza","servings":4,"cooking_time":60,"id":"5ed6604591c37cdc054bc958"}}}`
        ,
        `{"status":"success","data":{"recipe":{"publisher":"My Baking Addiction","ingredients":[{"quantity":1,"unit":"","description":"tbsp. canola or olive oil"},{"quantity":0.5,"unit":"cup","description":"chopped sweet onion"},{"quantity":3,"unit":"cups","description":"diced fresh red yellow and green bell peppers"},{"quantity":1,"unit":"","description":"tube refrigerated pizza dough"},{"quantity":0.5,"unit":"cup","description":"salsa"},{"quantity":2,"unit":"cups","description":"sargento chefstyle shredded pepper jack cheese"},{"quantity":null,"unit":"","description":"Chopped cilantro or dried oregano"}],"source_url":"http://www.mybakingaddiction.com/spicy-chicken-and-pepper-jack-pizza-recipe/","image_url":"http://forkify-api.herokuapp.com/images/FlatBread21of1a180.jpg","title":"Spicy Chicken and Pepper Jack Pizza","servings":4,"cooking_time":45,"id":"5ed6604591c37cdc054bc886"}}}`
        ,
        `{"status":"success","data":{"recipe":{"publisher":"What's Gaby Cooking","ingredients":[{"quantity":2.25,"unit":"tsps","description":"active dry yeast"},{"quantity":1,"unit":"cup","description":"warm water"},{"quantity":1,"unit":"tsp","description":"sugar"},{"quantity":2,"unit":"cups","description":"bread flour"},{"quantity":1,"unit":"cup","description":"ap flour"},{"quantity":2,"unit":"tbsps","description":"salt"},{"quantity":0.5,"unit":"cup","description":"butter melted"},{"quantity":1,"unit":"cup","description":"asiago cheese finely grated"},{"quantity":0.5,"unit":"cup","description":"pepperoni slices cut into small pieces"},{"quantity":1,"unit":"tsp","description":"dried oregano"},{"quantity":1,"unit":"tsp","description":"salt"},{"quantity":2,"unit":"","description":"cloves garlic finely minced"},{"quantity":1,"unit":"cup","description":"pizza sauce"},{"quantity":2.25,"unit":"tsps","description":"active dry yeast"},{"quantity":1,"unit":"cup","description":"warm water"},{"quantity":1,"unit":"tsp","description":"sugar"},{"quantity":2,"unit":"cups","description":"bread flour"},{"quantity":1,"unit":"cup","description":"ap flour"},{"quantity":2,"unit":"tbsps","description":"salt"},{"quantity":0.5,"unit":"cup","description":"butter melted"},{"quantity":1,"unit":"cup","description":"asiago cheese finely grated"},{"quantity":0.5,"unit":"cup","description":"pepperoni slices cut into small pieces"},{"quantity":1,"unit":"tsp","description":"dried oregano"},{"quantity":1,"unit":"tsp","description":"salt"},{"quantity":2,"unit":"","description":"cloves garlic finely minced"},{"quantity":1,"unit":"cup","description":"pizza sauce"}],"source_url":"http://whatsgabycooking.com/pepperoni-pizza-monkey-bread/","image_url":"http://forkify-api.herokuapp.com/images/PepperoniPizzaMonkeyBread8cd5.jpg","title":"Pepperoni Pizza Monkey Bread","servings":4,"cooking_time":135,"id":"5ed6604591c37cdc054bca36"}}}`
        ,
        `{"status":"success","data":{"recipe":{"publisher":"The Pioneer Woman","ingredients":[{"quantity":1,"unit":"tsp","description":"active dry yeast"},{"quantity":0.75,"unit":"cup","description":"warm water"},{"quantity":2,"unit":"cups","description":"all-purpose flour"},{"quantity":0.75,"unit":"tsp","description":"kosher salt"},{"quantity":3,"unit":"tbsps","description":"olive oil"},{"quantity":1,"unit":"","description":"whole recipe pizza crust"},{"quantity":1,"unit":"","description":"whole skirt steak or flank steak"},{"quantity":null,"unit":"","description":"Salt and pepper to taste"},{"quantity":2,"unit":"","description":"whole red onions sliced thin"},{"quantity":3,"unit":"tbsps","description":"butter"},{"quantity":4,"unit":"tbsps","description":"balsamic vinegar"},{"quantity":0.5,"unit":"tsp","description":"worcestershire sauce"},{"quantity":2,"unit":"cups","description":"marinara sauce"},{"quantity":12,"unit":"oz","description":"weight fresh mozzarella cheese sliced thin"},{"quantity":null,"unit":"","description":"Shaved parmesan cheese"},{"quantity":0.5,"unit":"cup","description":"good steak sauce"}],"source_url":"http://thepioneerwoman.com/cooking/2011/09/steakhouse-pizza/","image_url":"http://forkify-api.herokuapp.com/images/steakhousepizza0b87.jpg","title":"One Basic Pizza Crust","servings":4,"cooking_time":105,"id":"5ed6604591c37cdc054bcc76"}}}`
        ,
        `{"status":"success","data":{"recipe":{"publisher":"The Pioneer Woman","ingredients":[{"quantity":null,"unit":"","description":"Pizza crust"},{"quantity":1,"unit":"tsp","description":"active dry yeast"},{"quantity":4,"unit":"cups","description":"all-purpose flour"},{"quantity":1,"unit":"tsp","description":"kosher salt"},{"quantity":0.33,"unit":"cup","description":"olive oil"},{"quantity":null,"unit":"","description":"For the pizza:"},{"quantity":2,"unit":"tbsps","description":"olive oil"},{"quantity":4,"unit":"tbsps","description":"fig spread or jam"},{"quantity":null,"unit":"","description":"Kosher salt to taste"},{"quantity":12,"unit":"oz","description":"weight fresh mozzarella sliced thin"},{"quantity":6,"unit":"oz","description":"weight thinly sliced prosciutto"},{"quantity":1,"unit":"","description":"bunch washed and rinsed arugula"},{"quantity":null,"unit":"","description":"Freshly ground pepper to taste"},{"quantity":0.5,"unit":"cup","description":"shaved parmesan"}],"source_url":"http://thepioneerwoman.com/cooking/2011/09/fig-prosciutto-pizza-with-arugula/","image_url":"http://forkify-api.herokuapp.com/images/5278973957_3f9f9a21c2_o7a1b.jpg","title":"Fig-Prosciutto Pizza with Arugula","servings":4,"cooking_time":75,"id":"5ed6604591c37cdc054bcc72"}}}`
        ,
        `{"status":"success","data":{"recipe":{"publisher":"Real Simple","ingredients":[{"quantity":5,"unit":"tbsps","description":"olive oil plus more for the baking sheet"},{"quantity":1,"unit":"pound","description":"pizza dough at room temperature"},{"quantity":0.5,"unit":"pound","description":"brussels sprouts very thinly sliced"},{"quantity":2,"unit":"oz","description":"sliced salami cut into quarters"},{"quantity":0.5,"unit":"pound","description":"mozzarella grated"},{"quantity":3,"unit":"tbsps","description":"kosher salt and black pepper"},{"quantity":4,"unit":"cups","description":"fresh lemon juice"}],"source_url":"http://www.realsimple.com/food-recipes/browse-all-recipes/salami-brussels-sprouts-pizza-00100000066561/index.html","image_url":"http://forkify-api.herokuapp.com/images/pizza_30061a5d763.jpg","title":"Salami and Brussels Sprouts Pizza","servings":4,"cooking_time":60,"id":"5ed6604591c37cdc054bcc08"}}}`
        ,
    ];

const searchNames = ['pizza',]
const searchResults = [
    `
    {"status":"success","results":59,"data":{"recipes":[{"publisher":"Closet Cooking","image_url":"http://forkify-api.herokuapp.com/images/BBQChickenPizzawithCauliflowerCrust5004699695624ce.jpg","title":"Cauliflower Pizza Crust (with BBQ Chicken Pizza)","id":"5ed6604591c37cdc054bcd09"},{"publisher":"Closet Cooking","image_url":"http://forkify-api.herokuapp.com/images/BBQChickenPizzawithCauliflowerCrust5004699695624ce.jpg","title":"Cauliflower Pizza Crust (with BBQ Chicken Pizza)","id":"5ed6604591c37cdc054bcc13"},{"publisher":"Simply Recipes","image_url":"http://forkify-api.herokuapp.com/images/pizza292x2007a259a79.jpg","title":"Homemade Pizza","id":"5ed6604591c37cdc054bcb34"},{"publisher":"Simply Recipes","image_url":"http://forkify-api.herokuapp.com/images/howtogrillpizzad300x20086a60e1b.jpg","title":"How to Grill Pizza","id":"5ed6604591c37cdc054bcb37"},{"publisher":"Closet Cooking","image_url":"http://forkify-api.herokuapp.com/images/Pizza2BDip2B12B500c4c0a26c.jpg","title":"Pizza Dip","id":"5ed6604591c37cdc054bcac4"},{"publisher":"All Recipes","image_url":"http://forkify-api.herokuapp.com/images/391236ba85.jpg","title":"Veggie Pizza","id":"5ed6604591c37cdc054bca5d"},{"publisher":"All Recipes","image_url":"http://forkify-api.herokuapp.com/images/7988559586.jpg","title":"Valentine Pizza","id":"5ed6604591c37cdc054bca57"},{"publisher":"A Spicy Perspective","image_url":"http://forkify-api.herokuapp.com/images/IMG_4351180x1804f4a.jpg","title":"Greek Pizza","id":"5ed6604591c37cdc054bca3b"},{"publisher":"My Baking Addiction","image_url":"http://forkify-api.herokuapp.com/images/PizzaDip21of14f05.jpg","title":"Pizza Dip","id":"5ed6604591c37cdc054bca10"},{"publisher":"BBC Good Food","image_url":"http://forkify-api.herokuapp.com/images/1649634_MEDIUMd3fc.jpg","title":"Pitta pizzas","id":"5ed6604591c37cdc054bc990"},{"publisher":"All Recipes","image_url":"http://forkify-api.herokuapp.com/images/5100898cc5.jpg","title":"Pizza Casserole","id":"5ed6604591c37cdc054bc96e"},{"publisher":"All Recipes","image_url":"http://forkify-api.herokuapp.com/images/567c8fe.jpg","title":"Pizza Pinwheels","id":"5ed6604591c37cdc054bc971"},{"publisher":"All Recipes","image_url":"http://forkify-api.herokuapp.com/images/104254d419.jpg","title":"Pesto Pizza","id":"5ed6604591c37cdc054bc958"},{"publisher":"All Recipes","image_url":"http://forkify-api.herokuapp.com/images/636003da23.jpg","title":"Hummus Pizza","id":"5ed6604591c37cdc054bc8fd"},{"publisher":"BBC Good Food","image_url":"http://forkify-api.herokuapp.com/images/679637_MEDIUM765c.jpg","title":"Puff pizza tart","id":"5ed6604691c37cdc054bd0c0"},{"publisher":"What's Gaby Cooking","image_url":"http://forkify-api.herokuapp.com/images/PizzaMonkeyBread67f8.jpg","title":"Pizza Monkey Bread","id":"5ed6604691c37cdc054bd0bc"},{"publisher":"Epicurious","image_url":"http://forkify-api.herokuapp.com/images/51150600f4cb.jpg","title":"Veggi-Prosciutto Pizza","id":"5ed6604591c37cdc054bcfb2"},{"publisher":"My Baking Addiction","image_url":"http://forkify-api.herokuapp.com/images/BBQChickenPizza3e2b.jpg","title":"Barbecue Chicken Pizza","id":"5ed6604591c37cdc054bcfcc"},{"publisher":"The Pioneer Woman","image_url":"http://forkify-api.herokuapp.com/images/pizza3464.jpg","title":"Pizza Potato Skins","id":"5ed6604591c37cdc054bcebc"},{"publisher":"Two Peas and Their Pod","image_url":"http://forkify-api.herokuapp.com/images/minifruitpizzas52c00.jpg","title":"Mini Fruit Pizzas","id":"5ed6604591c37cdc054bce0d"},{"publisher":"Bon Appetit","image_url":"http://forkify-api.herokuapp.com/images/nokneadpizzadoughlahey6461467.jpg","title":"No-Knead Pizza Dough","id":"5ed6604591c37cdc054bcd86"},{"publisher":"The Pioneer Woman","image_url":"http://forkify-api.herokuapp.com/images/grilledveggie79bd.jpg","title":"Grilled Veggie Pizza","id":"5ed6604591c37cdc054bcc7e"},{"publisher":"The Pioneer Woman","image_url":"http://forkify-api.herokuapp.com/images/4797377235_c07589b7d4_be953.jpg","title":"Mexican “Flatbread” Pizza","id":"5ed6604591c37cdc054bccb2"},{"publisher":"The Pioneer Woman","image_url":"http://forkify-api.herokuapp.com/images/pizzaburgera5bd.jpg","title":"Pepperoni Pizza Burgers","id":"5ed6604591c37cdc054bcc40"},{"publisher":"The Pioneer Woman","image_url":"http://forkify-api.herokuapp.com/images/burger53be.jpg","title":"Supreme Pizza Burgers","id":"5ed6604591c37cdc054bcc3e"},{"publisher":"Closet Cooking","image_url":"http://forkify-api.herokuapp.com/images/Taco2BQuesadilla2BPizza2B5002B4417a4755e35.jpg","title":"Taco Quesadilla Pizzas","id":"5ed6604591c37cdc054bcae1"},{"publisher":"All Recipes","image_url":"http://forkify-api.herokuapp.com/images/580542e3ec.jpg","title":"Hot Pizza Dip","id":"5ed6604591c37cdc054bc8f7"},{"publisher":"Lisa's Kitchen","image_url":"http://forkify-api.herokuapp.com/images/hummus_pizza25f37.jpg","title":"Homemade Spicy Hummus Pizza","id":"5ed6604691c37cdc054bd0d4"},{"publisher":"My Baking Addiction","image_url":"http://forkify-api.herokuapp.com/images/PizzaDough1of12edit5779.jpg","title":"Simple No Knead Pizza Dough","id":"5ed6604691c37cdc054bd07c"},{"publisher":"Chow","image_url":"http://forkify-api.herokuapp.com/images/30624_RecipeImage_620x413_pepperoni_pizza_dip_4774d.jpg","title":"Pepperoni Pizza Dip Recipe","id":"5ed6604691c37cdc054bd034"},{"publisher":"What's Gaby Cooking","image_url":"http://forkify-api.herokuapp.com/images/PizzaHandPie4e08.jpg","title":"Pepperoni Pizza Hand Pies","id":"5ed6604691c37cdc054bd016"},{"publisher":"What's Gaby Cooking","image_url":"http://forkify-api.herokuapp.com/images/IMG_15866d21.jpg","title":"Grilled BBQ Chicken Pizza","id":"5ed6604691c37cdc054bd015"},{"publisher":"Whats Gaby Cooking","image_url":"http://forkify-api.herokuapp.com/images/IMG_98428b96.jpg","title":"Loaded Veggie and Prosciutto Pizza","id":"5ed6604591c37cdc054bcf8d"},{"publisher":"BBC Good Food","image_url":"http://forkify-api.herokuapp.com/images/2150654_MEDIUM6068.jpg","title":"Pizza bianco with artichoke hearts","id":"5ed6604591c37cdc054bcf7e"},{"publisher":"Vintage Mixer","image_url":"http://forkify-api.herokuapp.com/images/CauliflowerPizzaCrustRecipe06fdc.jpg","title":"Cauliflower Pizza Crust Recipe","id":"5ed6604591c37cdc054bcf09"},{"publisher":"The Pioneer Woman","image_url":"http://forkify-api.herokuapp.com/images/fruitpizza9a19.jpg","title":"Deep Dish Fruit Pizza","id":"5ed6604591c37cdc054bcc5b"},{"publisher":"101 Cookbooks","image_url":"http://forkify-api.herokuapp.com/images/best_pizza_dough_recipe1b20.jpg","title":"Best Pizza Dough Ever","id":"5ed6604591c37cdc054bcd07"},{"publisher":"The Pioneer Woman","image_url":"http://forkify-api.herokuapp.com/images/4364270576_302751a2a4f3c1.jpg","title":"PW's Favorite Pizza","id":"5ed6604591c37cdc054bccbd"},{"publisher":"The Pioneer Woman","image_url":"http://forkify-api.herokuapp.com/images/steakhousepizza0b87.jpg","title":"One Basic Pizza Crust","id":"5ed6604591c37cdc054bcc76"},{"publisher":"The Pioneer Woman","image_url":"http://forkify-api.herokuapp.com/images/5278973957_3f9f9a21c2_o7a1b.jpg","title":"Fig-Prosciutto Pizza with Arugula","id":"5ed6604591c37cdc054bcc72"},{"publisher":"Real Simple","image_url":"http://forkify-api.herokuapp.com/images/pizza_30061a5d763.jpg","title":"Salami and Brussels Sprouts Pizza","id":"5ed6604591c37cdc054bcc08"},{"publisher":"Real Simple","image_url":"http://forkify-api.herokuapp.com/images/pizza_300d938bd58.jpg","title":"English-Muffin Egg Pizzas","id":"5ed6604591c37cdc054bcbc1"},{"publisher":"BBC Good Food","image_url":"http://forkify-api.herokuapp.com/images/1813674_MEDIUM6f4a.jpg","title":"Salami &amp; peppadew pizza","id":"5ed6604591c37cdc054bcb6e"},{"publisher":"Closet Cooking","image_url":"http://forkify-api.herokuapp.com/images/Pizza2BQuesadillas2B2528aka2BPizzadillas25292B5002B834037bf306b.jpg","title":"Pizza Quesadillas (aka Pizzadillas)","id":"5ed6604591c37cdc054bcac5"},{"publisher":"What's Gaby Cooking","image_url":"http://forkify-api.herokuapp.com/images/PepperoniPizzaMonkeyBread8cd5.jpg","title":"Pepperoni Pizza Monkey Bread","id":"5ed6604591c37cdc054bca36"},{"publisher":"All Recipes","image_url":"http://forkify-api.herokuapp.com/images/191121d99d.jpg","title":"Fast English Muffin Pizzas","id":"5ed6604591c37cdc054bc8b7"},{"publisher":"All Recipes","image_url":"http://forkify-api.herokuapp.com/images/100111309d9.jpg","title":"Double Crust Stuffed Pizza","id":"5ed6604591c37cdc054bc89a"},{"publisher":"Two Peas and Their Pod","image_url":"http://forkify-api.herokuapp.com/images/peachbasilpizza6c7de.jpg","title":"Peach, Basil, Mozzarella, & Balsamic Pizza","id":"5ed6604591c37cdc054bce32"},{"publisher":"Two Peas and Their Pod","image_url":"http://forkify-api.herokuapp.com/images/avocadopizzawithcilantrosauce4bf5.jpg","title":"Avocado Pita Pizza with Cilantro Sauce","id":"5ed6604591c37cdc054bce0f"},{"publisher":"Bon Appetit","image_url":"http://forkify-api.herokuapp.com/images/figandgoatcheesepizzawitharugula646698d.jpg","title":"Fig and Goat Cheese Pizza with Arugula","id":"5ed6604591c37cdc054bcd81"},{"publisher":"The Pioneer Woman","image_url":"http://forkify-api.herokuapp.com/images/4433733640_8b0a5d19fbace0.jpg","title":"CPK's BBQ Chicken Pizza","id":"5ed6604591c37cdc054bccbc"},{"publisher":"Closet Cooking","image_url":"http://forkify-api.herokuapp.com/images/Avocado2Band2BFried2BEgg2BBreakfast2BPizza2B5002B296294dcea8a.jpg","title":"Avocado Breakfast Pizza with Fried Egg","id":"5ed6604591c37cdc054bca79"},{"publisher":"All Recipes","image_url":"http://forkify-api.herokuapp.com/images/237891b5e4.jpg","title":"Jay's Signature Pizza Crust","id":"5ed6604591c37cdc054bc90b"},{"publisher":"My Baking Addiction","image_url":"http://forkify-api.herokuapp.com/images/FlatBread21of1a180.jpg","title":"Spicy Chicken and Pepper Jack Pizza","id":"5ed6604591c37cdc054bc886"},{"publisher":"Real Simple","image_url":"http://forkify-api.herokuapp.com/images/20meals14_30007e78232.jpg","title":"Artichoke Pizzas With Lemony Green Bean Salad","id":"5ed6604591c37cdc054bcba5"},{"publisher":"Closet Cooking","image_url":"http://forkify-api.herokuapp.com/images/Thai2BChicken2BPizza2Bwith2BSweet2BChili2BSauce2B5002B435581bcf578.jpg","title":"Thai Chicken Pizza with Sweet Chili Sauce","id":"5ed6604591c37cdc054bcae5"},{"publisher":"Two Peas and Their Pod","image_url":"http://forkify-api.herokuapp.com/images/sweetpotatokalepizza2c6db.jpg","title":"Sweet Potato Kale Pizza with Rosemary & Red Onion","id":"5ed6604591c37cdc054bce26"},{"publisher":"Closet Cooking","image_url":"http://forkify-api.herokuapp.com/images/Strawberry2BBalsamic2BPizza2Bwith2BChicken252C2BSweet2BOnion2Band2BSmoked2BBacon2B5002B300939d125e2.jpg","title":"Balsamic Strawberry and Chicken Pizza with Sweet Onions and Smoked Bacon","id":"5ed6604591c37cdc054bca85"},{"publisher":"Jamie Oliver","image_url":"http://forkify-api.herokuapp.com/images/395_1_1350903959_lrgdd8a.jpg","title":"Egg, prosciutto, artichokes, olives, mozzarella, tomato sauce &amp; basil pizza topping","id":"5ed6604591c37cdc054bcf3a"}]}}
`,
];


// carrot
// broccoli
// asparagus
// cauliflower
// corn
// cucumber
// green pepper
// lettuce
// mushrooms
// onion
// potato
// pumpkin
// red pepper
// tomato
// beetroot
// brussel sprouts
// peas
// zucchini
// radish
// sweet potato
// artichoke
// leek
// cabbage
// celery
// chili
// garlic
// basil
// coriander
// parsley
// dill
// rosemary
// oregano
// cinnamon
// saffron
// green bean
// bean
// chickpea
// lentil
// apple
// apricot
// avocado
// banana
// blackberry
// blackcurrant
// blueberry
// boysenberry
// cherry
// coconut
// fig
// grape
// grapefruit
// kiwifruit
// lemon
// lime
// lychee
// mandarin
// mango
// melon
// nectarine
// orange
// papaya
// passion fruit
// peach
// pear
// pineapple
// plum
// pomegranate
// quince
// raspberry
// strawberry
// watermelon
// salad
// pizza
// pasta
// popcorn
// lobster
// steak
// bbq
// pudding
// hamburger
// pie
// cake
// sausage
// tacos
// kebab
// poutine
// seafood
// chips
// fries
// masala
// paella
// som tam
// chicken
// toast
// marzipan
// tofu
// ketchup
// hummus
// chili
// maple syrup
// parma ham
// fajitas
// champ
// lasagna
// poke
// chocolate
// croissant
// arepas
// bunny chow
// pierogi
// donuts
// rendang
// sushi
// ice cream
// duck
// curry
// beef
// goat
// lamb
// turkey
// pork
// fish
// crab
// bacon
// ham
// pepperoni
// salami
// ribs
