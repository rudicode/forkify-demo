import View from './View.js'
import imgIcons from 'url:../../img/icons.svg' // parcel v2

class PagenationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--inline')
            const goToPage = Number(btn?.dataset.goto);
            handler(goToPage);
        });
    }

    //
    // Private
    //
    _generateMarkup() {
        // this._data is the entire search object.
        const curPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

        // page 1, and there are other pages
        if (curPage === 1 && numPages > 1) {
            return this._generateMarkupBtnNext(curPage);
        }
        // last page
        if (curPage === numPages && numPages > 1) {
            return this._generateMarkupBtnPrev(curPage)
        }
        // other page
        if (curPage < numPages) {
            return this._generateMarkupBtnPrev(curPage) + this._generateMarkupBtnNext(curPage)
        }
        // page 1, and no other pages
        return ``;
    }

    _generateMarkupBtnNext(curPage) {
        return `
            <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                <use href="${imgIcons}#icon-arrow-right"></use>
                </svg>
            </button>
            `;
    }
    _generateMarkupBtnPrev(curPage) {
        return `
                <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                        <use href="${imgIcons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${curPage - 1}</span>
                </button>
                `;
    }
}


export default new PagenationView();