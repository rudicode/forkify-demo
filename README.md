## Forkify Portfolio Project
This project was originally created as part of an online tutorial
[Complete Javascript Course](https://github.com/jonasschmedtmann/complete-javascript-course).

## Additional Features Added
- Weakly Meal Plan
  - Each day of the week can have, breakfast, lunch and dinner
  - Add current recipe to Meal Plan
  - Remove a recipe from the Meal Plan
  - Undo any changes to the Meal Plan, before updating
  - save/load meal plan to localstore.
  - Toggle display today's meals under the main menu.
- SimpleCache class
  - used for caching recipe and search results.
  - created because API access is limited to an hourly rate.
  - helped reduce the number of outgoing API calls during development
  - click on the forkify logo to see the current state of the caches used, in the console.

## Running the App

- use git to clone this repository.
- ```npm install``` to install dependencies.
- copy "api-key.js.template" to "api-key.js"
- If you want to upload recipes you need to get an API key at: [https://forkify-api.herokuapp.com/v2](https://forkify-api.herokuapp.com/v2)
- Edit "api-key.js" file to add your API key.
- ```npm run start``` will start the development server
- Go to [localhost:3000](localhost:3000) to use the app.

## Using the App

#### Search
- Use the search to find a recipe you like, click on it to display it.
- Displays 10 results at a time, use pagination buttons on the bottom of results.

#### Recipe View
- You can bookmark it.
- You can ad it to the Meal Plan
- You can alter the number of servings with the +/- buttons
- Use the link to get to the source recipe web page.

#### Weekly Meal Plan
- To add or edit the Meal plan click "Add to Meals" in the menu or the + icon in the recipe.
- This opens up the Weekly Plan in a table.
- Click any cell to add the current recipe to the day of the week.
- You can add it to as many days as you wish.
- Changed days will be highlighted.
- You can Undo the last placement with the "Undo" button. Multiple undos work too.
- If you wish to remove a meal from a day, click on "Remove meal" button. The day border will change to red, then click on a day to remove it.
- You can also Undo a remove meal.
- When changes are complete use the "Update" button.
- Cancel all changes with the "Cancel" button.

#### Today View
- To toggle the Today View just click the "Today's Meals" button in the menu.
- Click on the links to see the recipe details.

#### Bookmarks
- Hover over the "Bookmarks" menu and you will see all the recipes that have been bookmarked.
- Any recipes you create will automatically be bookmarked.

#### Add recipe
- Click the "Add Recipe" button to open the form.
- Fill out the form.
- Ingredients have a special comma separated format: Quantity,Unit,Description
  - Skip quantity or unit by just having the commas.
  - eg. ```,,salt``` means that there is no quantity or unit
  - eg. ```1,,Apple``` means that there is no unit
- Click 'Upload" to send the recipe.
- If there are any errors you will be shown a message
- If you want to cancel just close the form in the top right.
