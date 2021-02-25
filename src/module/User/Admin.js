import User from './User';

export default class Admin extends User {
  constructor(user, selector) {
    super(user, selector);
    this.aditionalRights = ['add', 'remove', 'updatedd'];

    this.init();
  }

  init() {
    super.init();
    this.extendUserRights();
  }

  extendUserRights() {
    ['add', 'remove', 'updatedd'].forEach(right => this.user.rights.push(right));
  }
}
