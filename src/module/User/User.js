import Calendar from '../Calendar/Calendar';

export default class User {
  constructor(user, selector) {
    this.user = user;
    this.selector = selector;
    this.user.rights = ['filter'];

    this.init();
  }

  init() {
    this.calendar = new Calendar(this.selector, this.user);
  }
}
