import BlockContainer from '../../BlockContainer/BlockContainer';

export default class Modal {
  constructor(id, classes, model) {
    this.id = id;
    this.classes = classes;
    this.model = model;
  }

  render() {
    const modal = document.createElement('div');
    modal.setAttribute('id', this.id);
    document.body.append(modal);

    const header = new BlockContainer(
      `#${this.id}`,
      this.model[0].modalHeader.options.classes,
      this.model[0].modalHeader.content,
    );

    const body = new BlockContainer(
      `#${this.id}`,
      this.model[1].modalBody.options.classes,
      this.model[1].modalBody.content,
    );

    const footer = new BlockContainer(
      `#${this.id}`,
      this.model[2].modalFooter.options.classes,
      this.model[2].modalFooter.content,
    );

    header.render();
    body.render();
    footer.render();
  }
}
