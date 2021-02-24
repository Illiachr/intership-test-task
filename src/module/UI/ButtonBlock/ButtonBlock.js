import Block from '../../Block';

export default class ButtonBlock extends Block {
  toHTML() {
    const {
      tag,
      name,
      type,
      classes,
    } = this.options;
    return `<${tag} name=${name}, type=${type} class="${classes.join(' ')}">
                ${this.value}
            </${tag}>`;
  }
}
