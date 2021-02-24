import Block from '../../Block';

export default class AddEventBtnBlock extends Block {
  toHTML() {
    const {
      tag,
      classes,
      dataSet,
      iconClassses,
    } = this.options;
    return `<${tag} class="${classes.join(' ')}" ${dataSet.join(' ')}>
                <span>${this.value}</span>
                <span class="${iconClassses.join(' ')}"></span>
            </${tag}>`;
  }
}
