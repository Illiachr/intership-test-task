import { CLASS_LIST } from "./options";

const initialState = {
    events: [],
};

const getEvents = () => {
    let state = {};
    if (localStorage.getItem('eventStore')) {
        state = { ...JSON.parse(localStorage.getItem('eventStore')) };
    }
    return state;
};

export const render = event => {
    document.querySelectorAll('.row-meeting').forEach(row => {
        if (event.time === row.dataset.time) {
            row.querySelectorAll('.meeting-cell').forEach(cell => {
                if (cell.dataset.day === event.day) {
                    cell.classList.add(CLASS_LIST.SLOT_BISY);
                    cell.classList.remove(CLASS_LIST.OPEN_MODAL);
                    const span = cell.querySelector('.cancel-event');
                    span.style.display = 'inline';
                    cell.insertAdjacentHTML('afterbegin',
                        `<span data-type="event-name">${event.name}</span>`);
                }
            });
        }
    });
};

export const resetGrid = () => {
    document.querySelectorAll('.row-meeting').forEach(row => {
        row.querySelectorAll('.meeting-cell').forEach(cell => {
            cell.classList.remove(CLASS_LIST.SLOT_BISY);
            cell.classList.add(CLASS_LIST.OPEN_MODAL);
            const eventTitle = cell.querySelector('[data-type="event-name"]');
            const removeEventIcon = cell.querySelector('.cancel-event');
            eventTitle ? eventTitle.remove() : null;
            removeEventIcon.style.display = 'none';
        });
    });
};

export const renderFormLS = () => {
    let state = {};
    if (localStorage.getItem('eventStore')) {
        state = { ...JSON.parse(localStorage.getItem('eventStore')) };
    }
    state.events.forEach(render);
    console.log(state.events);
    return state.events;
};
