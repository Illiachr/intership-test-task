import { CLASS_LIST } from '../options';
import popup from './popup';

const state = {
    events: []
};

const render = () => {
    document.querySelectorAll('.row-meeting').forEach(row => {
        state.events.forEach(event => {
            if (event.time === row.dataset.time) {
                console.log(row);
            }
        });
    });
};

export default (selector = '.app') => {
    const calendar = document.querySelector(selector);

    calendar.addEventListener('click', e => {
        const { target } = e;
        console.log(target);

        if (target.closest(`.${CLASS_LIST.OPEN_MODAL}`)) {
            let day = '';
            let time = '';
            if (target.matches(`.${CLASS_LIST.METTING_CELL}`)) {
                time = target.closest('.row-meeting').dataset.time;
                day = target.dataset.day;
            }
            const modalId = target.dataset.modal;
            const modal = document.getElementById(modalId);
            popup(modal, state, day, time);
            console.log(state);
        }

        if (target.closest(`.${CLASS_LIST.SLOT_BISY}`)) {
            console.log('remove dialog');
        }
    });

    console.log(state);
};
