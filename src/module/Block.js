export default class Block {
  constructor(value, options) {
    this.value = value;
    this.options = options;
    this.errMsg = 'toHTML method must be implemented';
  }

  toHTML() {
    throw new Error(this.errMsg);
  }
}
