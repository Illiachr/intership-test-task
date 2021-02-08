import {
  CLASS_LIST, DEV_TEAM, eventHours, workWeek,
} from '../options';
import { render } from '../render';
import Select from '../UI/select/select';

const stateEventSlot = {
  event: {
    partisipants: [],
  },
  isBooked: false,
};

export default (popupId, state, day = '', time = '') => {
  const popup = document.getElementById(popupId);
  const eventForm = popup.querySelector('#event-form');
  const popUpHeader = popup.querySelector(`.${CLASS_LIST.MODAL_TITLE}`);
  const wranMsg = popup.querySelector(`.${CLASS_LIST.WARN}`);
  const msg = {
    nameWarn: 'Enter event name, please',
    inputWarn: 'Only letters a-z and space, please',
    timeErr: 'Failed to create event. This time is already booked',
    regExpNameReplace: /[^a-z\s]/gi,
    regExpNameTest: /^a-z\s?$/gi,
  };
  popUpHeader.textContent = 'Add Event';
  popup.classList.add(CLASS_LIST.MODAL_ACTIVE);

  const select = new Select('#participants', {
    defaultSeleted: '0',
    data: [
      { id: '0', value: 'All members' },
      ...DEV_TEAM,
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
      wranMsg.classList.remove('active');
      stateEventSlot.event = { ...stateEventSlot.event, day: selectedItems.id };
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
      wranMsg.classList.remove('active');
      stateEventSlot.event = { ...stateEventSlot.event, time: selectedItems.id };
    },
  });

  const inputHandler = e => {
    const { target } = e;

    if (target === eventForm.name) {
      wranMsg.classList.remove('active');
      target.value = target.value.replace(msg.regExpNameReplace, '');
      // if (msg.regExpName.test(target.value)) {
      //   console.log('ok');
      // }

      wranMsg.children[1].textContent = msg.inputWarn;
      wranMsg.classList.add('active');
    }
  };

  const submitHandler = e => {
    e.preventDefault();

    if (eventForm.name.value.trim() === '') {
      wranMsg.children[1].textContent = msg.nameWarn;
      wranMsg.classList.add('active');
      return;
    }

    stateEventSlot.event.id = `e${(Math.trunc(Math.random() * 1e8)).toString(16)}`;
    select.selectionResult();
    selectDay.selectionResult();
    selectTime.selectionResult();

    [...eventForm.elements].forEach(elem => {
      if (elem.matches('input') || elem.matches('select')) {
        if (!elem.matches('input[type=checkbox]')) {
          stateEventSlot.event = { ...stateEventSlot.event, [elem.name]: elem.value };
        }
      }
    });
    if (state.events.length >= 0) {
      state.events.forEach(event => {
        if (event.day === stateEventSlot.event.day &&
            event.time === stateEventSlot.event.time) {
          stateEventSlot.isBooked = true;
        } else { stateEventSlot.isBooked = false; }
      });
    }

    if (!stateEventSlot.isBooked) {
      state.events.push(stateEventSlot.event);
      localStorage.eventStore = JSON.stringify(state);
      render(stateEventSlot.event);
      closePopup();
    } else {
      wranMsg.children[1].textContent = msg.timeErr;
      wranMsg.classList.add('active');
    }
  };

  const clickHandler = e => {
    const { target } = e;
    if (target.closest(`.${CLASS_LIST.TRIGGER_CLOSE}`) ||
            target.classList.contains(CLASS_LIST.MODAL_ACTIVE)
    ) {
      closePopup();
    }

    if (target.closest(`.${CLASS_LIST.WARN}`)) {
      wranMsg.classList.remove('active');
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
    wranMsg.classList.remove('active');
    popup.classList.remove(CLASS_LIST.MODAL_ACTIVE);
  }

  select.init();
  selectDay.init();
  selectTime.init();

  popup.addEventListener('click', clickHandler);
  eventForm.addEventListener('input', inputHandler);
  eventForm.addEventListener('submit', submitHandler);
};
