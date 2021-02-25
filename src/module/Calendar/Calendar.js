import addEvent from '../addEvent';
import { classes, team } from '../auxiliary';
import removeEvent from '../removeEvent';
import { getEventStore, render, resetGrid } from '../render';
import Select from '../UI/select/select';
import { capitalize, firstFreeSlot } from '../utils';

export default class Calendar {
  constructor(selector, user) {
    this.root = document.querySelector(selector);
    this.user = user;
    this.addEventBtn = this.root.querySelector('[data-type="add-event"]');

    this.events = [];
    this.filtred = [];

    this.handlers = {
      click: [],
      dragNdrop: [],
    };

    this.activeEvents = {};

    this.init();
  }

  init() {
    this.user.rights.forEach(right => this[getMethodName(right)]());
    this.clickListener();
  }

  clickListener() {
    const clickHandler = e => {
      const { target } = e;
      this.handlers.click.forEach(handler => this[handler](target));
    };

    this.root.addEventListener('click', clickHandler);
  }

  onFilter() {
    const filter = this.filterByUser.bind(this);
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
        filter(item);
      },
    });

    this.events = getEventStore();
    if (this.events.length > 0) {
      this.events.forEach(render);
    }
  }

  onAdd() {
    this.newEvent = this.newEvent.bind(this);
    this.handlers.click.push('newEvent');
    this.addEventBtn.style.display = 'flex';
  }

  onRemove() {
    this.rmEvent = this.rmEvent.bind(this);
    this.handlers.click.push('rmEvent');
  }

  onUpdatedd() {
    this.root.addEventListener('dragstart', e => {
      const { target, dataTransfer } = e;
      const dragTarget = target.closest(`.${classes.slotBooked}`);
      if (dragTarget) {
        dataTransfer.setData('text/plain', dragTarget.dataset.eventId);
      }
    });

    this.root.addEventListener('dragenter', e => {
      const { target } = e;
      const targetBooked = target.closest(`.${classes.slotBooked}`);
      if (!targetBooked && target.closest(`.${classes.eventSlot}`)) {
        e.target.classList.add('drag-hover');
      }
    });

    this.root.addEventListener('dragover', e => {
      const { target } = e;
      const targetBooked = target.closest(`.${classes.slotBooked}`);
      if (!targetBooked && target.closest(`.${classes.eventSlot}`)) {
        e.preventDefault();
      }
    });

    this.root.addEventListener('dragleave', e => {
      e.target.classList.remove('drag-hover');
    });

    this.root.addEventListener('drop', e => {
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

  filterByUser(item) {
    if (item.id === '0') {
      resetGrid();
      this.events.forEach(render);
      return;
    }
    const filtred = this.events.reduce((arr, event) => {
      event.partisipants.forEach(member => {
        if (member.id === item.id) {
          arr.push(event);
        }
      });
      return arr;
    }, []);
    this.filtred = filtred;
    resetGrid();
    filtred.forEach(render);
  }

  newEvent(elem) {
    if (elem.closest(`.${classes.triggerOpen}`)) {
      const targetElem = elem.closest(`.${classes.triggerOpen}`);
      const firstFree = firstFreeSlot(this.root);
      const day = targetElem.dataset.day ? targetElem.dataset.day : firstFree.day;
      const time = targetElem.dataset.time ? targetElem.dataset.time : firstFree.time;
      const modalId = targetElem.dataset.modal;
      if (modalId) { addEvent(modalId, this.events, day, time); }
    }
  }

  rmEvent(elem) {
    if (elem.closest(`.${classes.removeEvent}`)) {
      const eventSlot = elem.closest(`.${classes.slotBooked}`);
      if (eventSlot) {
        removeEvent('event-remove', eventSlot, this.events);
      } else { console.warn('No event'); }
    }
  }
}

function getMethodName(eventName) {
  return `on${capitalize(eventName)}`;
}
