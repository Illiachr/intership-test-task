import addEvent from '../addEvent';
import { classes } from '../auxiliary';
import DataLayer from '../DataLayer/DataLayer';
import Emitter from '../Emitter';
import confirm from '../confirm';
import { render, resetGrid } from '../render';
import { Select } from '../UI/Select/Select';
import { firstFreeSlot, getMethodName } from '../utils';

export default class Calendar {
  constructor(selector, user) {
    this.root = document.querySelector(selector);
    this.user = user;
    this.allowRm = false;
    this.dataLayer = new DataLayer();
    this.emitter = new Emitter();

    this.erorrMsg = this.root.querySelector('[data-type="error-warn"]');
    this.statusMsg = this.root.querySelector('[data-type="controls-warning"]');
    this.addEventBtn = this.root.querySelector('[data-type="add-event"]');

    this.msg = {
      icon: this.statusMsg.children[0],
      text: this.statusMsg.children[1],
      loading: 'Updating events...',
      success: 'Events updated',
      loadingIconCls: 'fa-sync-alt',
      okIconCls: 'fa-check',
      erorrIconCls: 'fa-exclamation-circle',
    };

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
    this.user.allowedActions.forEach(action => this[getMethodName(action)]());
    if (this.dataLayer.events.length > 0) {
      this.dataLayer.events.forEach(event => render(event, this.allowRm));
    }
    this.clickListener();
    this.emitter.subcribe('data:load', () => { this.showLoad(); });
    this.emitter.subcribe('data:success', () => { this.showSuccess(); });
    this.emitter.subcribe('data:error', () => { this.showError(); });
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
    this.emitter.subcribe('addEvent:success', event => render(event, this.allowRm));
  }

  onRemove() {
    this.allowRm = true;
    this.rmEvent = this.rmEvent.bind(this);
    this.handlers.click.push('rmEvent');
    this.emitter.subcribe('events:remove', (isOk, err) => {
      if (isOk) {
        this.showSuccess();
      }
      if (err) {
        console.warn(err);
      }
    });
  }

  showError(err) {
    this.statusMsg.classList.remove('active');
    this.erorrMsg.classList.add('active');
    this.erorrMsg.children[1].textContent = err;
  }

  showLoad() {
    const { msg } = this;
    msg.text.textContent = msg.loading;
    this.statusMsg.classList.add('active');
  }

  showSuccess() {
    const { msg } = this;
    const delay = 10000;
    msg.icon.classList.remove(msg.loadingIconCls);
    msg.icon.classList.add(msg.okIconCls);
    msg.text.textContent = msg.success;
    setTimeout(() => {
      msg.icon.classList.remove(msg.okIconCls);
      msg.icon.classList.add(msg.loadingIconCls);
      msg.text.textContent = '';
      this.statusMsg.classList.remove('active');
    }, delay);
  }

  updateTable(isOk) {
    console.log(this);
    if (isOk) {
      resetGrid();
      this.dataLayer.events.forEach(event => render(event, this.allowRm));
      this.showSuccess();
    }
  }

  onUpdatedd() {
    const { events, eventsEntity } = this.dataLayer;

    this.emitter.subcribe('events:update', this.updateTable.bind(this));

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
        this.dataLayer.updateData(eventsEntity, eventIndex);
      }
    });
  }

  filterByUser(item) {
    if (item.id === '0') {
      resetGrid();
      this.dataLayer.events.forEach(event => render(event, this.allowRm));
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
    filtred.forEach(event => render(event, this.allowRm));
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

  async rmEvent(elem) {
    if (elem.closest(`.${classes.confirm}`)) {
      const eventSlot = elem.closest(`.${classes.slotBooked}`);
      if (eventSlot.dataset.eventId) {
        const id = eventSlot.dataset.eventId;
        await confirm('event-remove')
          .then(() => this.dataLayer.removeData(this.dataLayer.eventsEntity, id));
      } else { console.warn('event ID undefined'); }
    }
  }
}
