import { CLASS_LIST } from "./options";

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
