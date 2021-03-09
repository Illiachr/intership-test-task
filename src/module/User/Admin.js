import User from './User';

const actionList = ['add', 'remove', 'updatedd'];

export default class Admin extends User {
  constructor(name) {
    super(name);
    this.setAdminActions();
  }

  setAdminActions() {
    this.setActions(actionList);
  }
}
