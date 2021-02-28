import Calendar from '../Calendar/Calendar';

export default class User {
  constructor(user, selector) {
    this.user = user;
    this.selector = selector;
    this.user.rights = ['filter'];
  }

  init(userList, events) {
    console.log(userList, events);
    this.calendar = new Calendar(this.selector, this.user, userList, events);
  }
}
