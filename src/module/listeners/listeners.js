import { CLASS_LIST, DEV_TEAM } from '../options';
import { render, renderFormLS, resetGrid } from '../render';
import Select from '../UI/select/select';
import popup from './popup';

const state = {
    events: [],
};

export default (selector = '.app') => {
    const calendar = document.querySelector(selector);

    const filterByMember = new Select('#filter', {
        label: 'Filter',
        placeholder: 'Choose member...',
        defaultSeleted: '0',
        data: [
            { id: '0', value: 'All members' },
            ...DEV_TEAM,
        ],
        onSelect(item) {
            console.log(item);
            if (item.id === '0') {
                resetGrid();
                state.events.forEach(render);
                return;
            }
            const filtered = state.events.reduce((arr, event) => {
                event.partisipants.forEach(member => {
                    if (member.id === item.id) {
                        arr.push(event);
                    }
                });
                return arr;
            }, []);
            state.filtered = filtered;
            resetGrid();
            console.log(filtered);
            filtered.forEach(render);
        },
    });

    state.events = renderFormLS();
    console.log(state);
    state.events.forEach(render);
    filterByMember.init();
    calendar.addEventListener('click', e => {
        const { target } = e;

        if (target.closest(`.${CLASS_LIST.OPEN_MODAL}`)) {
            let day = '1';
            let time = '9';
            if (target.matches(`.${CLASS_LIST.METTING_CELL}`)) {
                time = target.dataset.time;
                day = target.dataset.day;
            }
            const modalId = target.dataset.modal;
            const modal = document.getElementById(modalId);
            popup(modal, state, day, time);
        }

        if (target.closest(`.${CLASS_LIST.RM_EVT}`)) {
            const eventSlot = target.closest(`.${CLASS_LIST.SLOT_BISY}`);
            if (eventSlot) {
                console.dir(eventSlot);
                const eventIndex = state.events.findIndex(event => event.id === eventSlot.dataset.eventId);
                state.events.splice(eventIndex, 1);
                eventSlot.dataset.eventId = '';
                eventSlot.classList.remove(CLASS_LIST.SLOT_BISY);
                eventSlot.children[0].textContent = '';
                eventSlot.children[1].style.display = 'none';
                localStorage.eventStore = JSON.stringify(state);
            } else { console.warn('No event'); }
            console.log(state);
        }
    });
};
