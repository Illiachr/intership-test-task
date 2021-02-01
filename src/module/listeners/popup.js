import { CLASS_LIST, DEV_TEAM, eventHours, workWeek } from '../options';
import { render } from '../render';
import Select from '../UI/select/select';

const statePopup = {
    event: {
        partisipants: []
    },
    isBooked: false,
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
            ...DEV_TEAM,
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
            statePopup.event.partisipants = [...members];
        }
    }, true);

    const selectDay = new Select('#day', {
        label: 'Day',
        placeholder: 'Choose day...',
        defaultSeleted: day,
        data: [
            ...workWeek,
        ],
        onSelect(selectedItems) {
            statePopup.event = { ...statePopup.event, day: selectedItems.id };
        }
    });

    const eventTimeTable = [];
    for (let hour = +eventHours.start; hour <= +eventHours.end; hour += +eventHours.step) {
        const eventTime = { id: `${hour}`, value: `${hour}:00` };
        eventTimeTable.push(eventTime);
    }

    const selectTime = new Select('#time', {
        label: 'Time',
        placeholder: 'Choose time...',
        defaultSeleted: time,
        data: eventTimeTable,
        onSelect(selectedItems) {
            console.log(selectedItems);
            statePopup.event = { ...statePopup.event, time: selectedItems.id };
        }
    });

    const submitHandler = e => {
        e.preventDefault();
        select.selectionResult();
        selectDay.selectionResult();
        selectTime.selectionResult();

        [...eventForm.elements].forEach(elem => {
            if (elem.matches('input') || elem.matches('select')) {
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
            state.events.push(statePopup.event);
            localStorage.eventStore = JSON.stringify(state);
            render(statePopup.event);
            closePopup();
        } else {
            console.log(`time is already booked`);
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
        select.destroy();
        selectDay.destroy();
        selectTime.destroy();
        eventForm.reset();
        popup.classList.remove(CLASS_LIST.MODAL_ACTIVE);
    }

    select.init();
    selectDay.init();
    selectTime.init();

    popup.addEventListener('click', clickHandler);
    eventForm.addEventListener('submit', submitHandler);
};


