import { classes } from './auxiliary';

const removeEvent = (state, eventSlot) => {
  const eventSlotChildren = eventSlot.children;
  const eventIndex = state.events.findIndex(event => event.id === eventSlot.dataset.eventId);
  state.events.splice(eventIndex, 1);
  eventSlot.removeAttribute('data-event-id');
  eventSlot.classList.remove(classes.slotBooked);
  eventSlotChildren[0].textContent = '';
  eventSlotChildren[1].style.display = 'none';
  localStorage.eventStore = JSON.stringify(state);
}; // end removeEvent

export default (modalId, elem, state) => {
  const popup = document.getElementById(modalId);

  popup.classList.add(classes.modalActive);

  const closePopup = (...args) => {
    popup.removeEventListener('click', args.clickHandler);
    popup.classList.remove(classes.modalActive);
  };

  const clickHandler = e => {
    const { target } = e;

    if (target.name === 'yes') {
      removeEvent(state, elem);
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
