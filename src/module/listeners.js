import { CLASS_LIST } from './options';

export default (selector = '.app') => {
    const calendar = document.querySelector(selector);

    calendar.addEventListener('click', e => {
        const { target } = e;
        console.log(target);

        if (target.closest(`.${CLASS_LIST.OPEN_MODAL}`)) {
            const modalId = target.dataset.modal;
            const modal = document.getElementById(modalId);
            const eventForm = modal.querySelector('#event-form');
            console.log(eventForm);
            modal.querySelector(`.${CLASS_LIST.MODAL_TITLE}`).textContent = 'Add Event';
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
};
