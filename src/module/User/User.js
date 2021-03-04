const actionList = ['filter'];

export default class User {
  constructor(name) {
    this.name = name;
    this.allowedActions = [];

    this.setActions(actionList);
  }

  setActions(actions) {
    actions.forEach(action => this.allowedActions.push(action));
  }

  unsetRight(right) {
    const index = this.rights.findIndex(currentRight => currentRight === right);
    this.rights.splice(index, 0);
  }
}
