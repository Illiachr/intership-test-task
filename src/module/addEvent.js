/* eslint-disable no-param-reassign */
import {
  classes,
  eventHours,
  workWeek,
} from './auxiliary';
import DataLayer from './DataLayer/DataLayer';
import Emitter from './Emitter';
import { Select } from './UI/Select/Select';
import UserSelect from './UI/Select/SelectMulti';
import { getTimeTable } from './utils';

export default function addEvent(popupId, day = '', time = '') {
  const popup = document.getElementById(popupId);
  const eventForm = popup.querySelector('#event-form');
  const warnMsg = popup.querySelector(`.${classes.modalWarning}`);
  const dataLayer = new DataLayer();
  const emitter = new Emitter();
  const eventSlot = {
    event: {
      id: '',
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
      dataLayer.storeData(dataLayer.eventsEntity, eventSlot.event);
      // storeEvent(events, stateEventSlot.event, addEvent.close, warnMsg);
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

  const unsubStore = emitter.subcribe('events:stored', isOk => {
    if (isOk) {
      addEvent.close();
      emitter.emit('addEvent:success', eventSlot.event);
    }
  });

  addEvent.close = () => {
    popup.removeEventListener('click', clickHandler);
    eventForm.removeEventListener('submit', submitHandler);
    eventForm.removeEventListener('input', inputHandler);
    unsubStore();
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

// async function storeEvent(events, event, closeHandler, msgBlock) {
//   const delay = 6000;
//   const msg = {
//     icon: msgBlock.children[0],
//     text: msgBlock.children[1],
//     loading: 'Event store in progress...',
//     success: 'New event stored',
//     error: 'Something wrong, try again',
//     loadingCss: 'color: #e0b411; background-color: #fdfda6',
//     okCss: 'color: green; background-color: #7fef7d',
//     loadinIconCls: 'fa-sync-alt',
//     okIconCls: 'fa-check',
//   };

//   let status = 0;

//   msg.icon.classList.remove('fa-exclamation-circle');
//   msg.icon.classList.add(msg.loadinIconCls);
//   msgBlock.style.cssText = msg.loadingCss;
//   msg.text.textContent = msg.loading;
//   msgBlock.classList.add('active');
//   const eventJson = JSON.stringify(event);
//   try {
//     const res = await postData('events', eventJson);
//     status = res.status;
//     const data = await res.json();
//     event.id = data.id;
//     events.push(event);
//     console.log(events);
//     render(event);
//     msg.icon.classList.remove(msg.loadinIconCls);
//     msg.icon.classList.add(msg.okIconCls);
//     msgBlock.style.cssText = msg.okCss;
//     msg.text.textContent = msg.success;
//   } catch (err) {
//     msg.icon.classList.remove(msg.okIconCls);
//     msg.icon.classList.add('fa-exclamation-circle');
//     msgBlock.style.cssText = '';
//     msg.text.textContent = msg.error;
//     console.warn(err);
//   } finally {
//     if (status === 200) {
//       setTimeout(() => {
//         closeHandler();
//         msg.icon.classList.remove(msg.okIconCls);
//         msg.icon.classList.add('fa-exclamation-circle');
//         msgBlock.style.cssText = '';
//         msg.text.textContent = '';
//         msgBlock.classList.remove('active');
//       }, delay);
//     }
//   }
// }
