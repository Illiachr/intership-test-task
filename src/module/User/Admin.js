import addEvent from '../addEvent';
import { classes, workWeek } from '../auxiliary';
import removeEvent from '../removeEvent';
import { render, resetGrid } from '../render';
import User from './User';

const firstFreeSlot = calendar => {
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

export default class Admin extends User {
  init() {
    super.init();
    this.addEventBtn = this.calendar.querySelector('[data-type="add-event"]');
    this.addEventBtn.style.display = 'flex';
    this.calendar.addEventListener('click', e => {
      this.onClick(e);
    });
    this.updateEvent();
  }

  onClick(e) {
    const { target } = e;

    if (target.closest(`.${classes.triggerOpen}`)) {
      const targetElem = target.closest(`.${classes.triggerOpen}`);
      const firstFree = firstFreeSlot(this.calendar);
      const day = targetElem.dataset.day ? targetElem.dataset.day : firstFree.day;
      const time = targetElem.dataset.time ? targetElem.dataset.time : firstFree.time;
      const modalId = targetElem.dataset.modal;
      if (modalId) { addEvent(modalId, this.events, day, time); }
    }

    if (target.closest(`.${classes.removeEvent}`)) {
      const eventSlot = target.closest(`.${classes.slotBooked}`);
      if (eventSlot) {
        removeEvent('event-remove', eventSlot, this.events);
      } else { console.warn('No event'); }
    }
  }

  updateEvent() {
    this.calendar.addEventListener('dragstart', e => {
      const { target, dataTransfer } = e;
      const dragTarget = target.closest(`.${classes.slotBooked}`);
      if (dragTarget) {
        dataTransfer.setData('text/plain', dragTarget.dataset.eventId);
      }
    });

    this.calendar.addEventListener('dragenter', e => {
      const { target } = e;
      const targetBooked = target.closest(`.${classes.slotBooked}`);
      if (!targetBooked && target.closest(`.${classes.eventSlot}`)) {
        e.target.classList.add('drag-hover');
      }
    });

    this.calendar.addEventListener('dragover', e => {
      const { target } = e;
      const targetBooked = target.closest(`.${classes.slotBooked}`);
      if (!targetBooked && target.closest(`.${classes.eventSlot}`)) {
        e.preventDefault();
      }
    });

    this.calendar.addEventListener('dragleave', e => {
      e.target.classList.remove('drag-hover');
    });

    this.calendar.addEventListener('drop', e => {
      const { target, dataTransfer } = e;
      const targetBooked = target.closest(`.${classes.slotBooked}`);

      if (!targetBooked && target.closest(`.${classes.eventSlot}`)) {
        e.preventDefault();
        target.classList.remove('drag-hover');
        const eventId = dataTransfer.getData('text/plain');
        dataTransfer.setData('text/plain', '');

        const eventIndex = this.events.findIndex(event => event.id === eventId);
        this.events[eventIndex].time = target.dataset.time;
        this.events[eventIndex].day = target.dataset.day;

        localStorage.eventStore = JSON.stringify(this.events);
        resetGrid();
        this.events.forEach(render);
      }
    });
  }
}
