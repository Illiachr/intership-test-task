import {
  CLASS_LIST,
  DEV_TEAM,
  eventHours,
  workWeek,
} from '../options';
import { render, renderFormLS, resetGrid } from '../render';
import Select from '../UI/select/select';
import popup from './popup';
import removeDialog from './removeDialog';

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
      const targetElem = target.closest(`.${CLASS_LIST.OPEN_MODAL}`);
      let day = workWeek[0].id;
      let time = eventHours.start;
      if (targetElem.matches(`.${CLASS_LIST.METTING_CELL}`)) {
        time = targetElem.dataset.time;
        day = targetElem.dataset.day;
      }
      const modalId = targetElem.dataset.modal;
      if (modalId) { popup(modalId, state, day, time); }
    }

    if (target.closest(`.${CLASS_LIST.RM_EVT}`)) {
      const eventSlot = target.closest(`.${CLASS_LIST.SLOT_BISY}`);
      if (eventSlot) {
        console.dir(eventSlot);
        removeDialog('event-remove', eventSlot, state);
      } else { console.warn('No event'); }
      console.log(state);
    }
  });
};
