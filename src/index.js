// TODO: add options by script
// TODO: add event
// TODO: edit event
// TODO: booking time slot
// TODO: add webpack
// TODO: add eslint airbnb
// TODO: save to localStorage
// TODO: destruct with modules

const CLASS_LIST = {
    MODAL: 'modal',
    MODAL_TITLE: 'modal__dialog-header-content',
    MODAL_ACTIVE: 'modal--active',
    MODAL_HAS_SCROLL: 'modal--has-scroll',
    MODAL_DIALOG_BODY: 'modal__dialog-body',
    TRIGGER_OPEN: 'js-modal-open',
    TRIGGER_CLOSE: 'js-modal-close',
    OPEN_MODAL: 'js-modal-open',
    METTING_CELL: 'meeting-cell',
}

const calendar = document.querySelector('.app');
const calendarGrid = document.querySelector('.calendar-grid');

for (let i = 10; i < 19; i += 1) {
    calendarGrid.insertAdjacentHTML('beforeend', `
        <div class="row-meeting">
            <div class="time-cell" data-time="${i}">${i}:00</div>
            <div class="meeting-cell js-modal-open" data-day="1" data-modal="modal-event">
                <span class="cancel-event">&times;</span>
            </div>
            <div class="meeting-cell js-modal-open" data-day="2" data-modal="modal-event">
                <span class="cancel-event">&times;</span>
            </div>
            <div class="meeting-cell js-modal-open" data-day="3" data-modal="modal-event">
                <span class="cancel-event">&times;</span>
            </div>
            <div class="meeting-cell js-modal-open" data-day="4" data-modal="modal-event">
                <span class="cancel-event">&times;</span>
            </div>
            <div class="meeting-cell js-modal-open" data-day="5" data-modal="modal-event">
                <span class="cancel-event">&times;</span>
            </div>
        </div>
    `);
}

calendar.addEventListener('click', e => {
    const { target } = e;
    console.log(target);

    if (target.closest(`.${CLASS_LIST.OPEN_MODAL}`)) {
        const modalId = target.dataset.modal;
        const modal = document.getElementById(modalId);
        const eventForm = modal.querySelector('#event-form');
        console.log(eventForm);
        modal.querySelector(`.${CLASS_LIST.MODAL_TITLE}`).textContent = 'Add Event'
        modal.classList.add(CLASS_LIST.MODAL_ACTIVE);

        modal.addEventListener('click', e => {
            const { target } = e;
            if (target.closest(`.${CLASS_LIST.TRIGGER_CLOSE}`) ||
                target.classList.contains(CLASS_LIST.MODAL_ACTIVE)
            ) {
                modal.classList.remove(CLASS_LIST.MODAL_ACTIVE);
            }
        });
        modal.addEventListener('submit', e => {
            e.preventDefault();
            [...eventForm.elements].forEach(elem => {
                if (elem.matches('input') || elem.matches('select')) {
                    console.log(elem.value);
                }
            });
        });
    }

    if (target.matches(`.${CLASS_LIST.METTING_CELL}`)) {
        const day = e.target.dataset.day;
        const time = e.target.closest('.row-meeting').firstElementChild.dataset.time;
        console.log('Day:', day);
        console.log(time);
        console.log(target);
    }
});

console.log(calendarGrid);