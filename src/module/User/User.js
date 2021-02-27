import Calendar from '../Calendar/Calendar';

export default class User {
  constructor(user, selector) {
    this.user = user;
    this.selector = selector;
    this.user.rights = ['filter'];
  }

  init(userList) {
    console.log(userList);
    this.calendar = new Calendar(this.selector, this.user, userList);
  }
}
