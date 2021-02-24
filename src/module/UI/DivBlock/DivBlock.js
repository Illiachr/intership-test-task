import Block from '../../Block';

export default class TitleBlock extends Block {
  toHTML() {
    const { tag, id } = this.options;
    return `<${tag} id="${id}">${this.value}</${tag}>`;
  }
}
