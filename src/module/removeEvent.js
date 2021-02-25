import { classes } from './auxiliary';

const removeEvent = (events, eventSlot) => {
  const eventSlotChildren = eventSlot.children;
  const eventIndex = events.findIndex(event => event.id === eventSlot.dataset.eventId);
  events.splice(eventIndex, 1);
  eventSlot.removeAttribute('data-event-id');
  eventSlot.classList.remove(classes.slotBooked);
  eventSlotChildren[0].textContent = '';
  eventSlotChildren[1].style.display = 'none';
  localStorage.eventStore = JSON.stringify(events);
}; // end removeEvent

export default (modalId, elem, events) => {
  const popup = document.getElementById(modalId);

  popup.classList.add(classes.modalActive);

  const closePopup = (...args) => {
    popup.removeEventListener('click', args.clickHandler);
    popup.classList.remove(classes.modalActive);
  };

  const clickHandler = e => {
    const { target } = e;

    if (target.name === 'yes') {
      removeEvent(events, elem);
      closePopup(clickHandler);
    }

    if (target.closest(`.${classes.triggerClose}`) ||
            target.classList.contains(classes.modalActive)
    ) {
      closePopup(clickHandler);
    }
  };

  popup.addEventListener('click', clickHandler);
};
