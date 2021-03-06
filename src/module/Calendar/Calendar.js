import addEvent from '../addEvent';
// import { updateData } from '../apiUtils/apiUtils';
import { classes } from '../auxiliary';
import DataLayer from '../DataLayer/DataLayer';
import Emitter from '../Emitter';
import removeEvent from '../removeEvent';
import { render, resetGrid } from '../render';
import { Select } from '../UI/Select/Select';
import { firstFreeSlot, getMethodName } from '../utils';

export default class Calendar {
  constructor(selector, user) {
    this.root = document.querySelector(selector);
    this.user = user;
    this.dataLayer = new DataLayer();
    this.emitter = new Emitter();
    // this.userList = userList;

    this.msgBlock = this.root.querySelector('[data-type="controls-warning"]');
    this.addEventBtn = this.root.querySelector('[data-type="add-event"]');

    // this.events = events || [];
    // this.filtred = [];

    this.handlers = {
      click: [],
      dragNdrop: [],
    };

    this.activeEvents = {};

    this.init();
  }

  init() {
    console.log(this.dataLayer);
    console.log(this.user);
    if (this.dataLayer.events.length > 0) {
      this.dataLayer.events.forEach(render);
    }
    this.user.allowedActions.forEach(action => this[getMethodName(action)]());
    this.clickListener();
    this.emitter.subcribe('addEvent:success', event => render(event));
    this.emitter.subcribe('events:updated', isOk => {
      if (isOk) {
        resetGrid();
        this.dataLayer.events.forEach(render);
      }
    });

    this.emitter.subcribe('events:delete', isOk => {
      if (isOk) {
        resetGrid();
        this.dataLayer.events.forEach(render);
      }
    });
  }

  clickListener() {
    const clickHandler = e => {
      const { target } = e;
      this.handlers.click.forEach(handler => this[handler](target));
    };

    this.root.addEventListener('click', clickHandler);
  }

  onFilter() {
    const { users } = this.dataLayer;
    const filter = this.filterByUser.bind(this);
    // eslint-disable-next-line no-unused-vars
    const filterByMember = new Select('#filter', {
      label: 'Filter',
      placeholder: 'Choose member...',
      defaultSeleted: '0',
      data: [
        { id: '0', value: 'All members' },
        ...users,
      ],
      onSelect(item) {
        filter(item);
      },
    });
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
    const { events, eventsEntity } = this.dataLayer;
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
        const eventIndex = events.findIndex(event => event.id === eventId);
        events[eventIndex].time = target.dataset.time;
        events[eventIndex].day = target.dataset.day;
        console.log(eventIndex);
        this.dataLayer.updateData(eventsEntity, eventIndex);
        // updateEvent(events, eventIndex, this.msgBlock);
      }
    });
  }

  filterByUser(item) {
    if (item.id === '0') {
      resetGrid();
      this.dataLayer.events.forEach(render);
      return;
    }
    const filtred = this.dataLayer.events.reduce((arr, event) => {
      event.partisipants.forEach(member => {
        if (member.id === item.id) {
          arr.push(event);
        }
      });
      return arr;
    }, []);
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
      if (modalId) { addEvent(modalId, day, time); }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  rmEvent(elem) {
    if (elem.closest(`.${classes.removeEvent}`)) {
      const eventSlot = elem.closest(`.${classes.slotBooked}`);
      if (eventSlot) {
        removeEvent('event-remove', eventSlot);
      } else { console.warn('No event'); }
    }
  }
}
