import { CLASS_LIST } from '../options';

export default (popup, day = '', time = '') => {
    const eventForm = popup.querySelector('#event-form');
    popup.querySelector(`.${CLASS_LIST.MODAL_TITLE}`).textContent = 'Add Event';
    popup.classList.add(CLASS_LIST.MODAL_ACTIVE);

    const submitHandler = e => {
        e.preventDefault();
        [...eventForm.elements].forEach(elem => {
            if (elem.matches('input') || elem.matches('select')) {
                console.log(elem.value);
            }
        });
        eventForm.reset();
    };

    const clickHandler = e => {
        const { target } = e;
        if (target.closest(`.${CLASS_LIST.TRIGGER_CLOSE}`) ||
            target.classList.contains(CLASS_LIST.MODAL_ACTIVE)
        ) {
            popup.removeEventListener('click', clickHandler);
            eventForm.removeEventListener('submit', submitHandler);
            eventForm.reset();
            popup.classList.remove(CLASS_LIST.MODAL_ACTIVE);
        }
    };

    eventForm.day.value = day;
    eventForm.time.value = time;

    popup.addEventListener('click', clickHandler);
    eventForm.addEventListener('submit', submitHandler);
};


