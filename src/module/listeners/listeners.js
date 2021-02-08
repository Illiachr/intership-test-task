import {
  CLASS_LIST,
  DEV_TEAM,
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

  const firstFreeSlot = () => {
    let nextFreeTime = '';
    let lastBookedDay = '';
    workWeek.forEach(day => {
      calendar.querySelectorAll(`.cell[data-day="${day.id}"]`)
        .forEach(elem => {
          if (!elem.dataset.eventId || elem.dataset.eventId.trim() === '') {
            if (lastBookedDay === '' && nextFreeTime === '') {
              lastBookedDay = elem.dataset.day;
              nextFreeTime = elem.dataset.time;
            }
          }
        });
    });
    return {
      day: lastBookedDay,
      time: nextFreeTime,
    };
  }; // end firstFreeSlot

  state.events = renderFormLS();
  console.log(state);
  state.events.forEach(render);
  filterByMember.init();
  calendar.addEventListener('click', e => {
    const { target } = e;

    if (target.closest(`.${CLASS_LIST.OPEN_MODAL}`)) {
      const targetElem = target.closest(`.${CLASS_LIST.OPEN_MODAL}`);
      const firstFree = firstFreeSlot();
      const day = targetElem.dataset.day ? targetElem.dataset.day : firstFree.day;
      const time = targetElem.dataset.time ? targetElem.dataset.time : firstFree.time;
      const modalId = targetElem.dataset.modal;
      if (modalId) { popup(modalId, state, day, time); }
    }

    if (target.closest(`.${CLASS_LIST.RM_EVT}`)) {
      const eventSlot = target.closest(`.${CLASS_LIST.SLOT_BISY}`);
      if (eventSlot) {
        removeDialog('event-remove', eventSlot, state);
      } else { console.warn('No event'); }
    }
  });

  calendar.addEventListener('dragstart', e => {
    const { target, dataTransfer } = e;
    const dragTarget = target.closest(`.${CLASS_LIST.SLOT_BISY}`);
    if (dragTarget) {
      dataTransfer.setData('text/plain', dragTarget.dataset.eventId);
    }
  });

  calendar.addEventListener('dragenter', e => {
    const { target } = e;
    const targetBooked = target.closest(`.${CLASS_LIST.SLOT_BISY}`);
    if (!targetBooked && target.closest(`.${CLASS_LIST.METTING_CELL}`)) {
      e.target.classList.add('drag-hover');
    }
  });

  calendar.addEventListener('dragover', e => {
    const { target } = e;
    const targetBooked = target.closest(`.${CLASS_LIST.SLOT_BISY}`);
    if (!targetBooked && target.closest(`.${CLASS_LIST.METTING_CELL}`)) {
      e.preventDefault();
    }
  });

  calendar.addEventListener('dragleave', e => {
    e.target.classList.remove('drag-hover');
  });

  calendar.addEventListener('drop', e => {
    const { target, dataTransfer } = e;
    const targetBooked = target.closest(`.${CLASS_LIST.SLOT_BISY}`);

    if (!targetBooked && target.closest(`.${CLASS_LIST.METTING_CELL}`)) {
      e.preventDefault();
      target.classList.remove('drag-hover');
      const eventId = dataTransfer.getData('text/plain');

      const eventIndex = state.events.findIndex(event => event.id === eventId);
      state.events[eventIndex].time = target.dataset.time;
      state.events[eventIndex].day = target.dataset.day;

      localStorage.eventStore = JSON.stringify(state);
      resetGrid();
      state.events.forEach(render);
    }
  });
};
