import { CLASS_LIST, DEV_TEAM } from '../options';
import Select from '../UI/select/select';
import popup from './popup';

const state = {
    events: [],
    filtered: []
};

// const render = () => {
//     document.querySelectorAll('.row-meeting').forEach(row => {
//         state.events.forEach(event => {
//             if (event.time === row.dataset.time) {
//                 console.log(row);
//             }
//         });
//     });
// };

export default (selector = '.app') => {
    const calendar = document.querySelector(selector);

    const filterByMember = new Select('#filter', {
        label: 'Filter',
        placeholder: 'Choose member...',
        defaultSeleted: "0",
        data: [
            { id: '0', value: 'All members' },
            ...DEV_TEAM,
        ],
        onSelect(item) {
            console.log(item);
            const filtered = state.events.reduce((arr, event) => {
                // todo filter by reduce
                event.partisipants.forEach(member => {
                    if (member.id === item.id) {
                        arr.push(event);
                    }
                });
                return arr;
            }, []);
            console.log(filtered);
        }
    });

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

        if (target.closest('#filter')) {
            filterByMember.selectionResult();
            console.log(state);
        }

        if (target.closest(`.${CLASS_LIST.SLOT_BISY}`)) {
            console.log('remove dialog');
        }
    });

};
