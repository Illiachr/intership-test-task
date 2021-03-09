/* eslint-disable no-param-reassign */
import {
  classes,
  eventHours,
  workWeek,
} from './auxiliary';
import DataLayer from './DataLayer/DataLayer';
import { Select } from './UI/Select/Select';
import UserSelect from './UI/Select/SelectMulti';
import { getTimeTable } from './utils';

export default function addEvent(popupId, day = '', time = '') {
  const popup = document.getElementById(popupId);
  const eventForm = popup.querySelector('#event-form');
  const warnMsg = popup.querySelector(`.${classes.modalWarning}`);
  const dataLayer = new DataLayer();

  const eventSlot = {
    event: {
      name: '',
      day,
      time,
      partisipants: [],
    },
    isBooked: false,
  };

  const msg = {
    processed: 'Event store in progress...',
    success: 'Event is stored',
    nameWarn: 'Enter event name, please',
    inputWarn: 'Only letters a-z and space, please',
    timeErr: 'Failed to create event. This time is already booked',
    regExpNameReplace: /[^a-z\s]/gi,
    regExpNameTest: /[a-z\s]/gi,
  };
  popup.classList.add(classes.modalActive);

  const select = new UserSelect('#participants', {
    defaultSeleted: '0',
    data: [
      { id: '0', value: 'All members' },
      ...dataLayer.users,
    ],
    onSelect(selectedItems) {
      let members = [];
      if (selectedItems.length <= 1 && selectedItems[0] === this.data[0].value) {
        members = this.data.reduce((total, item) => {
          selectedItems.forEach(selectItem => {
            if (selectItem !== item.value) {
              total.push(item);
            }
          });
          return total;
        }, []);
      } else {
        members = this.data.reduce((total, item) => {
          selectedItems.forEach(selectItem => {
            if (selectItem === item.value) {
              total.push(item);
            }
          });
          return total;
        }, []);
      }
      eventSlot.event.partisipants = [...members];
    },
  });

  const selectDay = new Select('#day', {
    placeholder: 'Choose day...',
    defaultSeleted: day,
    data: [
      ...workWeek,
    ],
    onSelect(selectedItems) {
      warnMsg.classList.remove('active');
      eventSlot.event.day = selectedItems.id;
    },
  });

  const selectTime = new Select('#time', {
    placeholder: 'Choose time...',
    defaultSeleted: time,
    data: getTimeTable(eventHours),
    onSelect(selectedItems) {
      warnMsg.classList.remove('active');
      eventSlot.event.time = selectedItems.id;
    },
  });

  const inputHandler = e => {
    const { target } = e;

    if (target === eventForm.name) {
      const checkValue = msg.regExpNameTest.test(target.value);
      if (checkValue) {
        warnMsg.classList.remove('active');
      } else {
        warnMsg.children[1].textContent = msg.inputWarn;
        warnMsg.classList.add('active');
      }
      target.value = target.value.replace(msg.regExpNameReplace, '');
    }
  };

  const submitHandler = e => {
    e.preventDefault();
    eventSlot.isBooked = false;

    if (eventForm.name.value.trim() === '') {
      warnMsg.children[1].textContent = msg.nameWarn;
      warnMsg.classList.add('active');
      return;
    }

    eventSlot.event.name = eventForm.name.value;
    select.selectionResult();
    selectTime.selectionResult();

    dataLayer.events.forEach(event => {
      if (event.day === eventSlot.event.day && event.time === eventSlot.event.time) {
        eventSlot.isBooked = true;
      }
    });

    if (!eventSlot.isBooked) {
      addEvent.close();
      dataLayer.storeData(dataLayer.eventsEntity, eventSlot.event);
    } else {
      warnMsg.children[1].textContent = msg.timeErr;
      warnMsg.classList.add('active');
    }
  };

  const clickHandler = e => {
    const { target } = e;
    if (
      target.closest(`.${classes.triggerClose}`) ||
      target.classList.contains(classes.modalActive)
    ) {
      addEvent.close();
    }

    if (target.closest(`.${classes.modalWarning}`)) {
      warnMsg.classList.remove('active');
    }
  };

  addEvent.close = () => {
    popup.removeEventListener('click', clickHandler);
    eventForm.removeEventListener('submit', submitHandler);
    eventForm.removeEventListener('input', inputHandler);
    select.destroy();
    selectDay.destroy();
    selectTime.destroy();
    eventForm.reset();
    warnMsg.classList.remove('active');
    popup.classList.remove(classes.modalActive);
  };

  popup.addEventListener('click', clickHandler);
  eventForm.addEventListener('input', inputHandler);
  eventForm.addEventListener('submit', submitHandler);
}
