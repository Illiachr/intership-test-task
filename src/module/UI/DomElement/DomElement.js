export default class DomElement {
  constructor(tag, options, content) {
    this.tag = tag;
    this.elem = document.createElement(this.tag);
    this.content = content || null;
    this.id = options.id || null;
    this.classes = options.classes || null;
    this.data = options.data || null;

    this.init();
  }

  init() {
    this.addClass();
    this.setId();
    this.setData();
    if (this.content) {
      this.elem.textContent = this.content;
    }
  }

  add(parent) {
    parent.append(this.elem);
  }

  addClass() {
    if (this.classes) {
      this.elem.className = this.classes.join(' ');
    }
  }

  setId() {
    if (this.id) {
      this.elem.id = this.id;
    }
  }

  setData() {
    if (this.data) {
      Object.keys(this.data).forEach(key => {
        this.elem.dataset[key] = this.data[key];
      });
    }
  }
}
