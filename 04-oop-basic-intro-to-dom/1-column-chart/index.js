export default class ColumnChart {
        chartHeight = 50;
        subElements = {};

        constructor({data = [],
                    label = "",
                    value = 0,
                    link = '',
                    formatHeading = data => data} = {}) {

          this.data = data;
          this.label = label;
          this.value = value;
          this.link = link;
          this.value = formatHeading(value);

          this.render();
          this.initEventListeners();
        }

        getTemplate () {
          return `
            <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
              <div class="column-chart__title">
                Total ${this.label}
                ${this.getLink()}
              </div>
              <div class="column-chart__container">
                <div data-element="header" class="column-chart__header">
                  ${this.value}
                </div>
                <div data-element="body" class="column-chart__chart">
                  ${this.getColumnBody(this.data)}
                </div>
              </div>
            </div>
          `
        }

      render() {

        const element = document.createElement('div'); // (*)

        element.innerHTML = this.getTemplate();
        this.element = element.firstElementChild;

        if(this.data.length) {

          this.element.classList.remove("column-chart_loading");
        }

        this.subElements = this.getSubElements();
      }

      getSubElements () {

        const result = {};
        const elements = this.element.querySelectorAll('[data-element]');

        for (const subElement of elements) {
          const name = subElement.dataset.element;
          result[name] =  subElement;
        }

        return result;
      }

      getColumnBody (data) {
        // сделать массив и добавить все туда
        const mapData = this.getColumnProps(data);

        const htmlDataArray = mapData.map(item => {
          return `<div style="--value: ${item.value}" data-tooltip="${item.percent}"></div>`;
        });

        return htmlDataArray.join('\n');
      }

      getLink () {
        return this.link ? `<a class="column-chart__link" href="${this.link}">View all</a>` : '';
      }

      update (data) {
        this.data = data;
        this.subElements.body.innerHTML = this.getColumnBody(data);
      }

      remove () {
        if (this.element) {
          this.element.remove();
        }
      }

      destroy () {
        this.remove();
        this.element = null;
        this.subElements = {};
        // NOTE: удаляем обработчики событий, если они есть
      }

      initEventListeners () {}

      getColumnProps(data) {
        const maxValue = Math.max(...data);
        const scale = this.chartHeight / maxValue;

        return data.map(item => {
          return {
            percent: (item / maxValue * 100).toFixed(0) + '%',
            value: String(Math.floor(item * scale))
          };
        });
      }
    }
