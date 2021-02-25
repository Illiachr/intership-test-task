import Calendar from '../Calendar/Calendar';

export default class User {
  constructor(user, selector) {
    this.user = user;
    this.selector = selector;
    this.user.rights = ['filter'];
  }

  init() {
    this.calendar = new Calendar(this.selector, this.user);
  }
}
