import User from './User';

export default class Admin extends User {
  constructor(user, selector) {
    super(user, selector);
    this.extendedRights = ['add', 'remove', 'updatedd'];
  }

  init() {
    this.setExtendedUserRights();
    super.init();
  }

  setExtendedUserRights() {
    this.extendedRights.forEach(right => this.user.rights.push(right));
  }
}
