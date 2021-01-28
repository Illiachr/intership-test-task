import { CLASS_LIST } from '../options';
import popup from './popup';

export default (selector = '.app') => {
    const calendar = document.querySelector(selector);

    calendar.addEventListener('click', e => {
        const { target } = e;
        console.log(target);

        if (target.closest(`.${CLASS_LIST.OPEN_MODAL}`)) {
            const modalId = target.dataset.modal;
            const modal = document.getElementById(modalId);
            popup(modal);
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
