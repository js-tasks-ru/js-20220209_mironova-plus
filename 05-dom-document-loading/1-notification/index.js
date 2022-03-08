export default class NotificationMessage {
  timerId = 0;
  static onPage = false;
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

    if(NotificationMessage.onPage) {

      document.querySelector('.notification').replaceWith(this.element);
      clearTimeout(this.timerId);

    } else {
       elem.append(this.element);
    }

    NotificationMessage.onPage = true;

    this.timerId = setTimeout(() => {this.remove(); this.destroy();}, this.duration);
  }

  remove () {
    if(this.element) this.element.remove();
    NotificationMessage.onPage = false;
  }

  destroy () {

    this.remove();
    this.element = null;
    NotificationMessage.onPage = false;

  }
}


