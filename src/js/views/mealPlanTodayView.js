import View from './View.js'
import imgIcons from 'url:../../img/icons.svg' // parcel v2

class MealPlanTodayView extends View {
    _parentElement = document.querySelector('.meal-plan-today');
    _message = 'Meal Plan  successfuly updated';
    _btnNavOpen = document.querySelector('.nav__btn--meal-plan');
    _table = document.querySelector('.meal-plan__today_table');


    constructor() {
        super();
        // add listener as soon as view is created
        this._addHandlerClickToggle();

    }

    _addHandlerClickToggle() {
        this._btnNavOpen.addEventListener('click', function () {
            this._parentElement.classList.toggle('collapsed');
        }.bind(this))
    }

    renderTodayView(todaysMeals) {
        const [todaysPlan, day] = todaysMeals
        const markup = this._generateTable(todaysPlan, day);
        this._table.innerHTML = '';
        this._table.insertAdjacentHTML('afterbegin', markup);
    }

    _generateMarkup() {
    }

    _generateTable(todaysPlan, day) {
        return `
        <table class="meal-plan__today_table">
        <tbody>
            ${this._generateTableRow(todaysPlan, day)}
        </tbody>
        </table>
        `
    }

    _generateTableRow(row, day) {
        const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
            'Friday', 'Saturday'];
        const rowData = row.map((data, index) => {
            return this._generateTableRowData(data, day, index);
        }).join('\n');
        return `
        <tr>
            <td>${daysOfTheWeek[day]}</td>
            ${rowData}
        </tr>
          `;
    }

    _generateTableRowData(data, dayNum, mealNum) {
        const mealNames = ['Breakfast', 'Lunch', 'Dinner']
        return `
        <td>
        <a class="preview__link" href="#${data?.id || ''}">
            ${this._generateFigure(data)}
            ${this._generateMarkupSummary(data?.title || '', data?.publisher || `No ${mealNames[mealNum]}`)}
        </a>
      </td>`;
    }

    _generateMarkupSummary(title = "Cheese Pizza", publisher = "Homer Simpson") {
        return `
            <div class="preview__data">
                <h4 class="preview__title">${title}</h4>
                <p class="preview__publisher">${publisher}</p>
            </div>
        `;
    }

    _generateFigure(data) {
        if(data) {
            return `
            <figure class="preview__fig">
                <img src="${data.image}" alt="${data.title}" />
            </figure>
            `
        }
        return ``
    }
}


export default new MealPlanTodayView();