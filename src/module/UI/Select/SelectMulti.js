import { Select, classes } from './Select';

export default class SelectMulti extends Select {
  select(id) {
    if (this.selectedItems.length <= 1 && this.selectedItems[0] === 'All members') {
      this.elem.querySelector(`[data-id="${this.selectedId}"]`).classList.remove(classes.selected);
      this.selectedItems.splice(this.isSelected, 1);
      this.elem.querySelectorAll('[data-type="item"]').forEach(elem => {
        elem.classList.remove(classes.selected);
      });
    }
    this.selectedId = id;
    const selectedItem = this.elem.querySelector(`[data-id="${this.selectedId}"]`);
    if (this.selectedId === '0' && !selectedItem.classList.contains(classes.selected)) {
      this.selectedItems = [];
      this.selectedItems.push(this.current.value);
      this.elem.querySelectorAll('[data-type="item"]').forEach(elem => {
        elem.classList.add(classes.selected);
      });
      this.value.textContent = this.selectedItems.join(', ');
      return;
    }
    if (this.isSelected < 0) {
      this.selectedItems.push(this.current.value);
      selectedItem.classList.add(classes.selected);
    } else if (this.selectedItems.length > 1) {
      this.selectedItems.splice(this.isSelected, 1);
      selectedItem.classList.remove(classes.selected);
    }
    this.value.textContent = this.selectedItems.join(', ');
  }

  selectionResult() {
    if (this.options.onSelect) {
      this.options.onSelect(this.selectedItems);
    }
  }
} // end SelectMulti
