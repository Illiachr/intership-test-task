import { postData } from './apiUtils.js/apiUtils';
import {
  classes,
  eventHours,
  workWeek,
} from './auxiliary';
import { render } from './render';
import Select from './UI/select/select';

// const generateId = () => `e${(Math.trunc(Math.random() * 1e8)).toString(16)}`;

export default (popupId, events, userList, day = '', time = '') => {
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
      storeEvent(stateEventSlot.event);
      localStorage.eventStore = JSON.stringify(events);
      closePopup();
    } else {
      warnMsg.children[1].textContent = msg.timeErr;
      warnMsg.classList.add('active');
    }
  };

  const clickHandler = e => {
    const { target } = e;
    if (target.closest(`.${classes.triggerClose}`) ||
            target.classList.contains(classes.modalActive)
    ) {
      closePopup();
    }

    if (target.closest(`.${classes.modalWarning}`)) {
      warnMsg.classList.remove('active');
    }
  };

  function closePopup() {
    popup.removeEventListener('click', clickHandler);
    eventForm.removeEventListener('submit', submitHandler);
    eventForm.removeEventListener('input', inputHandler);
    select.destroy();
    selectDay.destroy();
    selectTime.destroy();
    eventForm.reset();
    warnMsg.classList.remove('active');
    popup.classList.remove(classes.modalActive);
  }

  popup.addEventListener('click', clickHandler);
  eventForm.addEventListener('input', inputHandler);
  eventForm.addEventListener('submit', submitHandler);
};

async function storeEvent(event) {
  console.log('Event store in progress...');
  const eventJson = JSON.stringify(event);
  try {
    const res = await postData('events', eventJson);
    const data = await res.json();
    console.log(data.id);
    // eslint-disable-next-line no-param-reassign
    event.id = data.id;
    render(event);
    console.log('New event stored');
  } catch (err) {
    console.warn(err);
  }
}
