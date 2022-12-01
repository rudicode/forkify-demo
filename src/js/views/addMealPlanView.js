import View from './View.js';
import imgIcons from 'url:../../img/icons.svg'; // parcel v2

class AddMealPlanView extends View {
    _parentElement = document.querySelector('.meal-plan');
    _message = 'Meal Plan  successfuly updated';
    _window = document.querySelector('.add-meal-plan-window');
    _overlay = document.querySelector('.overlay-meal-plan');
    _btnOpen = document.querySelector('.btn-add-to-meal-plan');
    _btnNavOpen = document.querySelector('.nav__btn--meal-plan');
    _btnClose = document.querySelector('.btn--close-meal-plan');
    _btnCancel = document.querySelector('.meal-plan__btn__cancel');
    _btnOk = document.querySelector('.meal-plan__btn__ok');
    _btnUndo = document.querySelector('.meal-plan__btn__undo');
    _btnRemove = document.querySelector('.meal-plan__btn__remove');
    _table = document.querySelector('.meal-plan__table');
    _currentRecipeEl = document.querySelector('.current_recipe');

    _originalMealPlan;
    _removingMeal = false;
    _addToMealPlanArr = [];
    _recipeToAdd;

    constructor() {
        super();
        // add listener as soon as view is created
        this._addHandlerCloseWindow();
        this._addHandlerClickTable();
        this._addHandlerClickUndo();
        this._addHandlerClickRemove();
    }
    populateMealPlan(mealPlan, recipe) {
        if (!mealPlan) return;
        // console.log(`controller populate meal plan.`, mealPlan);
        // console.log(`controller set current recipe.`, recipe);
        this._originalMealPlan = mealPlan;
        this._recipeToAdd = recipe;
        this._addToMealPlanArr = [];

        this._renderTable();

        const recipeMarkup = this._generateCurrentRecipe(this._recipeToAdd);
        this._currentRecipeEl.innerHTML = '';
        this._currentRecipeEl.insertAdjacentHTML('afterbegin', recipeMarkup);

        this._toggleWindow();
    }

    _renderTable() {
        const markup = this._generateTable(this._originalMealPlan);
        this._table.innerHTML = '';
        this._table.insertAdjacentHTML('afterbegin', markup);
    }

    _renderAddedMeals() {
        // after renderTable, this will fill in all the newly added positions
        this._addToMealPlanArr.forEach( item => {
            const [day, meal, recipe] = item;
            const el = this._table.querySelector(`[data-day='${day}'][data-meal='${meal}']`)

            const newMarkup = this._generateMarkupSummary(recipe?.title, recipe?.publisher);
            el.innerHTML = '';
            el.insertAdjacentHTML('afterbegin', newMarkup);
            el.classList.toggle('table_highlight');
        })
    }

    _undoMealPlan() {
        this._addToMealPlanArr.pop();
        this._renderTable();
        this._renderAddedMeals();
    }

    _toggleDeleteHighlight(elements) {
        elements.forEach( el => el.classList.toggle('delete-highlight'))
    }

    _setToRemoveMeal() {
        this._removingMeal = true;
        const tdEl = this._table.querySelectorAll('td[data-day]')
        this._toggleDeleteHighlight(tdEl);
    }

    _toggleWindow() {
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }

    _addHandlerOpenMealPlan(handler) {
        this._btnOpen.addEventListener(
            'click',
            function () {
                console.log(`_addHandlerOpenMealPlan: `);
                handler();
            }.bind(this)
        );
    }

    _addHandlerCloseWindow() {
        this._btnClose.addEventListener('click', this._toggleWindow.bind(this));
        this._overlay.addEventListener('click', this._toggleWindow.bind(this));
        this._btnCancel.addEventListener('click', this._toggleWindow.bind(this));
    }

    _addHandlerClickUndo() {
        this._btnUndo.addEventListener(
            'click',
            function () {
                this._undoMealPlan();
            }.bind(this)
        );
    }

    _addHandlerClickRemove() {
        this._btnRemove.addEventListener('click', function() {
            this._setToRemoveMeal();
        }.bind(this)
        )
    }

    _addHandlerUpdateMealPlan(handler) {
        this._btnOk.addEventListener(
            'click',
            function (e) {
                this._toggleWindow();
                handler(this._addToMealPlanArr);
            }.bind(this)
        );
    }

    _addHandlerClickTable() {
        this._table.addEventListener(
            'click',
            function (e) {
                const currentCell = e.target.closest('td');
                if (this._recipeToAdd.id && currentCell?.dataset.day) {
                    const item = this._removingMeal ? null : this._recipeToAdd;
                    this._addToMealPlanArr.push([+currentCell.dataset.day, +currentCell.dataset.meal, item]);
                    this._removingMeal = false;
                }
                this._renderTable();
                this._renderAddedMeals();
            }.bind(this)
        );
    }

    _generateMarkup() {}

    _generateCurrentRecipe(rec) {
        let recipe = rec;
        if (!recipe.id) recipe = {title: 'None Selected', publisher: ''}
        return `
        <h3>Add to meal plan</h3>
        <h4 class="preview__title">${recipe.title}</h4>
        <p class="preview__publisher">${recipe.publisher}</p>
        `;
    }

    _generateTable(mealPlan) {
        return `${this._generateTableHeader()}${this._generateTableBody(mealPlan)}`;
    }

    _generateTableHeader() {
        return `
        <thead>
          <tr>
            <th></th>
            <th>Breakfast</th>
            <th>Lunch</th>
            <th>Dinner</th>
          </tr>
        </thead>`;
    }

    _generateTableBody(mealPlan) {
        // console.log(mealPlan);
        const rows = mealPlan
            .map((row, index) => {
                return this._generateTableRow(row, index);
            })
            .join('\n');
        // console.log(rows);
        return `
        <tbody>
          ${rows}
        </tbody>`;
    }

    _generateTableRow(row, day) {
        const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const rowData = row
            .map((data, index) => {
                return this._generateTableRowData(data, day, index);
            })
            .join('\n');
        return `
        <tr>
            <th>${daysOfTheWeek[day]}</th>
            ${rowData}
        </tr>
          `;
    }

    _generateTableRowData(data, dayNum, mealNum) {
        return `
        <td data-day="${dayNum}" data-meal="${mealNum}" data-id="${data?.id || 0}">
        ${this._generateMarkupSummary(data?.title || '', data?.publisher || 'Empty')}
      </td>`;
    }

    _generateMarkupSummary(title = '', publisher = 'Empty') {
        return `
        <div class="preview__data">
            <h4 class="preview__title">${title}</h4>
            <p class="preview__publisher">${publisher}</p>
        </div>
        `;
    }
}

export default new AddMealPlanView();
