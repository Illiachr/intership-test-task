import { CLASS_LIST } from '../options';

const removeEvent = (state, eventSlot) => {
  console.log(state);
  const eventSlotchildren = eventSlot.children;
  const eventIndex = state.events.findIndex(event => event.id === eventSlot.dataset.eventId);
  state.events.splice(eventIndex, 1);
  eventSlot.cell.removeAttribute('data-event-id');
  eventSlot.classList.remove(CLASS_LIST.SLOT_BISY);
  eventSlotchildren[0].textContent = '';
  eventSlotchildren[1].style.display = 'none';
  localStorage.eventStore = JSON.stringify(state);
}; // end removeEvent

export default (modalId, elem, state) => {
  const popup = document.getElementById(modalId);

  popup.classList.add(CLASS_LIST.MODAL_ACTIVE);

  const closePopup = (...args) => {
    popup.removeEventListener('click', args.clickHandler);
    popup.classList.remove(CLASS_LIST.MODAL_ACTIVE);
  };

  const clickHandler = e => {
    const { target } = e;

    if (target.name === 'yes') {
      console.log(elem.dataset.eventId);
      removeEvent(state, elem);
      closePopup(clickHandler);
    }

    if (target.closest(`.${CLASS_LIST.TRIGGER_CLOSE}`) ||
            target.classList.contains(CLASS_LIST.MODAL_ACTIVE)
    ) {
      closePopup(clickHandler);
    }
  };

  popup.addEventListener('click', clickHandler);
};
