export default class BlockContainer {
  constructor(selector, classes, model) {
    this.parent = document.querySelector(selector);
    this.classes = classes || [];
    this.model = model || [];
  }

  render() {
    this.elem = document.createElement('div');
    this.elem.className = this.classes.join(' ');
    this.parent.append(this.elem);
    this.model.forEach(block => {
      this.elem.insertAdjacentHTML('beforeend', block.toHTML());
    });
  }
}
