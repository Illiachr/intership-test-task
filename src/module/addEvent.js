/* eslint-disable no-param-reassign */
import { postData } from './apiUtils/apiUtils';
import {
  classes,
  eventHours,
  workWeek,
} from './auxiliary';
import { render } from './render';
import Select from './UI/select/select';

// const generateId = () => `e${(Math.trunc(Math.random() * 1e8)).toString(16)}`;

export default function addEvent(popupId, events, userList, day = '', time = '') {
  const popup = document.getElementById(popupId);
  const eventForm = popup.querySelector('#event-form');
  const warnMsg = popup.querySelector(`.${classes.modalWarning}`);
  const stateEventSlot = {
    event: { partisipants: [] },
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

  const select = new Select('#participants', {
    defaultSeleted: '0',
    data: [
      { id: '0', value: 'All members' },
      ...userList,
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
      stateEventSlot.event.partisipants = [...members];
    },
  }, true);

  const selectDay = new Select('#day', {
    placeholder: 'Choose day...',
    defaultSeleted: day,
    data: [
      ...workWeek,
    ],
    onSelect(selectedItems) {
      warnMsg.classList.remove('active');
      stateEventSlot.event.day = selectedItems.id;
    },
  });

  const eventTimeTable = [];
  for (let hour = +eventHours.start; hour <= +eventHours.end; hour += +eventHours.step) {
    const eventTime = { id: `${hour}`, value: `${hour}:00` };
    eventTimeTable.push(eventTime);
  }

  const selectTime = new Select('#time', {
    placeholder: 'Choose time...',
    defaultSeleted: time,
    data: eventTimeTable,
    onSelect(selectedItems) {
      warnMsg.classList.remove('active');
      stateEventSlot.event.time = selectedItems.id;
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
    stateEventSlot.isBooked = false;

    if (eventForm.name.value.trim() === '') {
      warnMsg.children[1].textContent = msg.nameWarn;
      warnMsg.classList.add('active');
      return;
    }

    stateEventSlot.event.name = eventForm.name.value;
    select.selectionResult();
    selectDay.selectionResult();
    selectTime.selectionResult();

    events.forEach(event => {
      if (event.day === stateEventSlot.event.day && event.time === stateEventSlot.event.time) {
        stateEventSlot.isBooked = true;
      }
    });

    if (!stateEventSlot.isBooked) {
      events.push(stateEventSlot.event);
      storeEvent(stateEventSlot.event, addEvent.close, warnMsg);
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

async function storeEvent(event, closeHandler, msgBlock) {
  const delay = 6000;
  const msg = {
    icon: msgBlock.children[0],
    text: msgBlock.children[1],
    loading: 'Event store in progress...',
    success: 'New event stored',
    error: 'Something wrong, try again',
    loadingCss: 'color: #e0b411; background-color: #fdfda6',
    okCss: 'color: green; background-color: #7fef7d',
    loadinIconCls: 'fa-sync-alt',
    okIconCls: 'fa-check',
  };

  let status = 0;

  msg.icon.classList.remove('fa-exclamation-circle');
  msg.icon.classList.add(msg.loadinIconCls);
  msgBlock.style.cssText = msg.loadingCss;
  msg.text.textContent = msg.loading;
  msgBlock.classList.add('active');
  const eventJson = JSON.stringify(event);
  try {
    const res = await postData('events', eventJson);
    status = res.status;
    const data = await res.json();
    event.id = data.id;
    render(event);
    msg.icon.classList.remove(msg.loadinIconCls);
    msg.icon.classList.add(msg.okIconCls);
    msgBlock.style.cssText = msg.okCss;
    msg.text.textContent = msg.success;
  } catch (err) {
    msg.icon.classList.remove(msg.okIconCls);
    msg.icon.classList.add('fa-exclamation-circle');
    msgBlock.style.cssText = '';
    msg.text.textContent = msg.error;
    console.warn(err);
  } finally {
    if (status === 200) {
      setTimeout(() => {
        closeHandler();
        msg.icon.classList.remove(msg.okIconCls);
        msg.icon.classList.add('fa-exclamation-circle');
        msgBlock.style.cssText = '';
        msg.text.textContent = '';
        msgBlock.classList.remove('active');
      }, delay);
    }
  }
}
