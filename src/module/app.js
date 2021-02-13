import {
  classes,
  team,
  workWeek,
} from './auxiliary';
import { getEventStore, render, resetGrid } from './render';
import addEvent from './addEvent';
import removeEvent from './removeEvent';
import Select from './UI/select/select';

const state = {
  events: [],
};

export default (selector = '.app') => {
  const calendar = document.querySelector(selector);

  // eslint-disable-next-line no-unused-vars
  const filterByMember = new Select('#filter', {
    label: 'Filter',
    placeholder: 'Choose member...',
    defaultSeleted: '0',
    data: [
      { id: '0', value: 'All members' },
      ...team,
    ],
    onSelect(item) {
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

  state.events = getEventStore().events;
  if (state.events.length > 0) {
    state.events.forEach(render);
  }

  calendar.addEventListener('click', e => {
    const { target } = e;

    if (target.closest(`.${classes.triggerOpen}`)) {
      const targetElem = target.closest(`.${classes.triggerOpen}`);
      const firstFree = firstFreeSlot();
      const day = targetElem.dataset.day ? targetElem.dataset.day : firstFree.day;
      const time = targetElem.dataset.time ? targetElem.dataset.time : firstFree.time;
      const modalId = targetElem.dataset.modal;
      if (modalId) { addEvent(modalId, state, day, time); }
    }

    if (target.closest(`.${classes.removeEvent}`)) {
      const eventSlot = target.closest(`.${classes.slotBooked}`);
      if (eventSlot) {
        removeEvent('event-remove', eventSlot, state);
      } else { console.warn('No event'); }
    }
  });

  calendar.addEventListener('dragstart', e => {
    const { target, dataTransfer } = e;
    const dragTarget = target.closest(`.${classes.slotBooked}`);
    if (dragTarget) {
      dataTransfer.setData('text/plain', dragTarget.dataset.eventId);
    }
  });

  calendar.addEventListener('dragenter', e => {
    const { target } = e;
    const targetBooked = target.closest(`.${classes.slotBooked}`);
    if (!targetBooked && target.closest(`.${classes.eventSlot}`)) {
      e.target.classList.add('drag-hover');
    }
  });

  calendar.addEventListener('dragover', e => {
    const { target } = e;
    const targetBooked = target.closest(`.${classes.slotBooked}`);
    if (!targetBooked && target.closest(`.${classes.eventSlot}`)) {
      e.preventDefault();
    }
  });

  calendar.addEventListener('dragleave', e => {
    e.target.classList.remove('drag-hover');
  });

  calendar.addEventListener('drop', e => {
    const { target, dataTransfer } = e;
    const targetBooked = target.closest(`.${classes.slotBooked}`);

    if (!targetBooked && target.closest(`.${classes.eventSlot}`)) {
      e.preventDefault();
      target.classList.remove('drag-hover');
      const eventId = dataTransfer.getData('text/plain');
      dataTransfer.setData('text/plain', '');

      const eventIndex = state.events.findIndex(event => event.id === eventId);
      state.events[eventIndex].time = target.dataset.time;
      state.events[eventIndex].day = target.dataset.day;

      localStorage.eventStore = JSON.stringify(state);
      resetGrid();
      state.events.forEach(render);
    }
  });
};
