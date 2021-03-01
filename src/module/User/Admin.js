import User from './User';

export default class Admin extends User {
  constructor(user, selector) {
    super(user, selector);
    this.extendedRights = ['add', 'remove', 'updatedd'];
  }

  init(userList, events) {
    this.setExtendedUserRights();
    super.init(userList, events);
  }

  setExtendedUserRights() {
    this.extendedRights.forEach(right => this.user.rights.push(right));
  }
}
