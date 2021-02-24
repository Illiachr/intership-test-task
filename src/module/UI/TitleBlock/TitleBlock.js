import Block from '../../Block';

export default class TitleBlock extends Block {
  toHTML() {
    const { tag, classes } = this.options;
    return `<${tag} class="${classes.join(' ')}">${this.value}</${tag}>`;
  }
}
