const classes = {
    base: 'select',
    selected: 'selected',
    open: 'select--open',
    close: 'select--close',
    arrowRight: 'fa-chevron-right',
    arrowDown: 'fa-chevron-down',
    dropDown: 'select__dropdown',
};

const getTemplate = props => {
    let defVal = props.defaultValue ?? 'Choose option...';
    const items = props.data.map(item => {
        let cls = '';
        if (props.selectedId && item.id === props.selectedId) {
            defVal = item.value;
            cls = classes.selected;
        }
        return `
            <li class="${classes.dropDown}-item ${cls}"
                data-type="item"
                data-id="${item.id}"
            >
                ${item.value}
            </li>
        `;
    });

    return `        
            <div class="${classes.base}__backdrop" data-type="backdrop"></div>
            <span class="${classes.base}__label">${props.label}:</span>
            <div class="${classes.base}__wrapper">
                <div class="${classes.base}__input" data-type="input" data-action="toggle">
                    <span data-type="value">${defVal}</span>
                    <span class="fas fa-chevron-right" data-type="arrow"></span>
                </div>
                <div class="${classes.dropDown}">
                    <ul class="${classes.dropDown}-list">
                        ${items.join('')}
                    </ul>
                </div>
            </div>
    `;
};

export default class Select {
    constructor(selector, options, multi = false) {
        this.elem = document.querySelector(selector);
        this.options = options;
        this.multi = multi;
        this.selectedId = options.defaultSeleted;
        this.selectedItems = [];
    }

    init() {
        this.render();
        this.setup();
    }

    render() {
        const { label, data } = this.options;
        this.elem.classList.add('select');
        this.elem.insertAdjacentHTML('beforeend', getTemplate({
            label,
            data,
            selectedId: this.selectedId,
        }));
    }

    setup() {
        const { data } = this.options;
        this.clickHandler = this.clickHandler.bind(this);
        this.elem.addEventListener('click', this.clickHandler);
        this.arrow = this.elem.querySelector('[data-type="arrow"]');
        this.value = this.elem.querySelector('[data-type="value"]');
        this.selectedItems = data.reduce((total, item) => {
            if (item.id === this.selectedId) {
                total.push(item.value);
            }
            return total;
        }, []);
    }

    clickHandler(e) {
        const { target } = e;
        const { type } = target.dataset;
        const input = target.closest('[data-type="input"]');
        if (input) {
            this.toggle();
        }

        if (type === 'item') {
            console.log(this.multi);
            this.multi ? this.multiSelect(target.dataset.id) : this.select(target.dataset.id);
        }

        if (type === 'backdrop') {
            this.close();
        }
    }

    open() {
        this.arrow.classList.remove(classes.arrowRight);
        this.arrow.classList.add(classes.arrowDown);
        this.elem.classList.add(classes.open);

    }

    close() {
        this.arrow.classList.remove(classes.arrowDown);
        this.arrow.classList.add(classes.arrowRight);
        this.elem.classList.remove(classes.open);
    }

    get isOpen() {
        return this.elem.classList.contains(classes.open);
    }

    get current() {
        return this.options.data.find(item => item.id === this.selectedId);
    }

    get isSelected() {
        return this.selectedItems.findIndex(item => item === this.current.value);
    }

    select(id) {
        this.selectedId = id;
        this.value.textContent = this.current.value;

        this.elem.querySelectorAll('[data-type="item"]').forEach(el => {
            el.classList.remove('selected');
        });
        this.elem.querySelector(`[data-id="${id}"]`).classList.add('selected');
        this.close();
    }

    multiSelect(id) {
        if (this.selectedItems.length <= 1 && this.selectedItems[0] === "All members") {
            this.elem.querySelector(`[data-id="${this.selectedId}"]`).classList.remove(classes.selected);
            this.selectedItems.splice(this.isSelected, 1);
            this.elem.querySelectorAll('[data-type="item"]').forEach(elem => {
                elem.classList.remove(classes.selected);
            });
        }
        this.selectedId = id;
        const selectedItem = this.elem.querySelector(`[data-id="${this.selectedId}"]`);
        if (this.selectedId === "0" && !selectedItem.classList.contains(classes.selected)) {
            console.log(id);
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
        } else {
            this.selectedItems.splice(this.isSelected, 1);
            selectedItem.classList.remove(classes.selected);
        }
        this.value.textContent = this.selectedItems.join(', ');
    }

    selectionResult() {
        if (this.options.onSelect) {
            this.multi ?
                this.options.onSelect(this.selectedItems) :
                this.options.onSelect(this.current);
        } else { return null; }
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    destroy() {
        this.elem.removeEventListener('click', this.clickHandler);
        this.elem.textContent = '';
    }
}
