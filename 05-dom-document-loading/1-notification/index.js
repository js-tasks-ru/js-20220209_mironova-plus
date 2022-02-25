export default class NotificationMessage {
  timerId = 0;
  constructor (msg = '',{duration = 0, type = 'success'} = {}) {

    this.msg = msg;
    this.type = type;
    this.duration = duration;

    this.render ();
  }

  render () {
    const element = document.createElement('div');
    element.innerHTML = this.getTemplate();

    this.element = element.firstElementChild;
  }

  getTemplate() {
    return `
              <div class="notification ${this.type}" style="--value: ${this.duration}s">
                <div class="timer"></div>
                <div class="inner-wrapper">
                  <div class="notification-header">${this.type}</div>
                  <div class="notification-body">
                    ${this.msg}
                  </div>
                </div>
              </div>
            `;
  }

  show (elem = document.body) {

    let el = document.querySelector('.notification');

    if(el) {
      el.remove();
      clearTimeout(this.timerId);
    }

    elem.append(this.element);

    this.timerId = setTimeout(() => {this.remove(); this.destroy();}, this.duration);
  }

  remove () {
    document.querySelector('.notification').remove();
  }

  destroy () {
    this.element.remove();
    this.timerId = 0;
    this.msg = '';
    this.type = 'success';
    this.duration = 0;
  }
}


