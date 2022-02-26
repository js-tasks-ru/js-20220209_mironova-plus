export default class SortableTable {
  subElements = [];

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;

    this.render();
  }


  render () {
    const element = document.createElement('div');
    element.innerHTML = this.getTemplate();

    this.element = element.firstElementChild;
  }

  getTemplate () {
    const arHeader = [];
    const arBody = [];

    for (let val of this.headerConfig) {
      arHeader.push(`<div class="sortable-table__cell" data-id="${val.id}" data-sortable="${val.sortable}" data-order="asc">
          <span>${val.title}</span>
        </div>`);
    }

    for ( let val of this.data) {
      arBody.push(`
        <a href="/products/${val.id}" class="sortable-table__row">

        ${this.headerConfig[0].template(val["images"])}

          <div class="sortable-table__cell">${val["title"]}</div>

          <div class="sortable-table__cell">${val["quantity"]}</div>

          <div class="sortable-table__cell">${val["price"]}</div>

          <div class="sortable-table__cell">${val["sales"]}</div>
      </a>
        `);
    }

    return `
        <div data-element="productsContainer" class="products-list__container">
          <div class="sortable-table">
           <div data-element="header" class="sortable-table__header sortable-table__row">
            ${arHeader.join('\n')}
           </div>
           <div data-element="body" class="sortable-table__body">
           ${arBody.join('\n')};
           </div>
          </div>
        </div>
    `;
  }


  sort () {

  }

  destroy () {
    this.remove();
    this.element = null;
  }
}

