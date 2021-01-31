import { CLASS_LIST } from '../options';
import Select from '../UI/select/select';

const statePopup = {
    event: {
        partisipants: []
    },
    isBooked: false,
};

const render = () => {
    document.querySelectorAll('.row-meeting').forEach(row => {
        if (statePopup.event.time === row.dataset.time) {
            row.querySelectorAll('.meeting-cell').forEach(cell => {
                if (cell.dataset.day === statePopup.event.day) {
                    cell.classList.add(CLASS_LIST.SLOT_BISY);
                    cell.classList.remove(CLASS_LIST.OPEN_MODAL);
                    const span = cell.querySelector('.cancel-event');
                    span.style.display = 'inline';
                    cell.insertAdjacentHTML('afterbegin', statePopup.event.name);
                }
            });
        }
    });
};

export default (popup, state, day = '', time = '') => {
    const eventForm = popup.querySelector('#event-form');
    popup.querySelector(`.${CLASS_LIST.MODAL_TITLE}`).textContent = 'Add Event';
    popup.classList.add(CLASS_LIST.MODAL_ACTIVE);

    const select = new Select('#participants', {
        label: 'Participants',
        defaultSeleted: "0",
        data: [
            { id: '0', value: 'All members' },
            { id: '1', value: 'Maria' },
            { id: '2', value: 'Max' },
            { id: '3', value: 'John' },
            { id: '4', value: 'Nick' },
            { id: '5', value: 'Natali' },
        ],
        onSelect(selectedItems) {
            let members = [];
            if (selectedItems.length <= 1 && selectedItems[0] === this.data[0].value) {
                members = this.data.reduce((total, item) => {
                    selectedItems.forEach(selectItem => {
                        if (selectItem !== item.value) {
                            total.push(item);
                        }
                    });
                    return total;
                }, []);
            } else {
                members = this.data.reduce((total, item) => {
                    selectedItems.forEach(selectItem => {
                        if (selectItem === item.value) {
                            total.push(item);
                        }
                    });
                    return total;
                }, []);
            }

            state.members = [...members];
            console.log(state);
        }
    });

    const submitHandler = e => {
        e.preventDefault();
        [...eventForm.elements].forEach(elem => {
            if (elem.matches('input[type=checkbox]') && elem.checked) {
                console.log(elem.value);
                statePopup.event.partisipants.push(elem.value);
            } else if (elem.matches('input') || elem.matches('select')) {
                if (!elem.matches('input[type=checkbox]')) {
                    statePopup.event = { ...statePopup.event, [elem.name]: elem.value };
                }
            }
        });
        if (state.events.length > 0) {
            state.events.forEach(event => {
                if (event.day === statePopup.event.day && event.time === statePopup.event.time) {
                    statePopup.isBooked = true;
                } else { statePopup.isBooked = false; }
            });
        }

        if (!statePopup.isBooked) {
            state = state.events.push(statePopup.event);
            render();
            closePopup();
        }
    };

    const clickHandler = e => {
        const { target } = e;
        if (target.closest(`.${CLASS_LIST.TRIGGER_CLOSE}`) ||
            target.classList.contains(CLASS_LIST.MODAL_ACTIVE)
        ) {
            closePopup();
        }
    };

    function closePopup() {
        popup.removeEventListener('click', clickHandler);
        eventForm.removeEventListener('submit', submitHandler);
        eventForm.reset();
        popup.classList.remove(CLASS_LIST.MODAL_ACTIVE);
    }

    eventForm.day.value = day;
    eventForm.time.value = time;

    popup.addEventListener('click', clickHandler);
    eventForm.addEventListener('submit', submitHandler);
};


