import { classes } from './auxiliary';
import DataLayer from './DataLayer/DataLayer';

// const removeEvent = eventSlot => {
//   const eventSlotChildren = eventSlot.children;
//   const eventIndex = dataLayer.events.findIndex(event => event.id === eventSlot.dataset.eventId);
//   dataLayer.events.splice(eventIndex, 1);
//   eventSlot.removeAttribute('data-event-id');
//   eventSlot.removeAttribute('draggable');
//   eventSlot.classList.remove(classes.slotBooked);
//   eventSlot.classList.add(classes.triggerOpen);
//   eventSlotChildren[0].textContent = '';
//   eventSlotChildren[1].style.display = 'none';
// }; // end removeEvent

export default (modalId, elem) => {
  const popup = document.getElementById(modalId);
  const dataLayer = new DataLayer();

  popup.classList.add(classes.modalActive);

  const closePopup = (...args) => {
    popup.removeEventListener('click', args.clickHandler);
    popup.classList.remove(classes.modalActive);
  };

  const clickHandler = e => {
    const { target } = e;

    if (target.name === 'yes') {
      dataLayer.removeData(dataLayer.eventsEntity, elem.dataset.eventId);
      // removeEventApi('events', events, elem, msgBlock);
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

// async function removeEventApi(entityName, events, elem, msgBlock) {
//   const delay = 10000;
//   const msg = {
//     icon: msgBlock.children[0],
//     text: msgBlock.children[1],
//     loading: 'Removing event...',
//     success: 'Event removed',
//     error: 'Something wrong, try again',
//     loadingIconCls: 'fa-sync-alt',
//     okIconCls: 'fa-check',
//     erorrIconCls: 'fa-exclamation-circle',
//   };

//   let status = 0;

//   // eslint-disable-next-line no-param-reassign
//   msg.text.textContent = msg.loading;
//   msgBlock.classList.add('active');

//   try {
//     const res = await deleteData(entityName, elem.dataset.eventId);
//     status = res.status;
//     removeEvent(events, elem);
//     msg.icon.classList.remove(msg.loadingIconCls);
//     msg.icon.classList.add(msg.okIconCls);
//     msg.text.textContent = msg.success;
//   } catch (err) {
//     msg.icon.classList.remove(msg.okIconCls);
//     msg.icon.classList.add(msg.erorrIconCls);
//     msg.text.textContent = msg.error;
//     console.warn(err);
//   } finally {
//     if (status === 204) {
//       console.log(status);
//       setTimeout(() => {
//         msg.icon.classList.remove(msg.okIconCls);
//         msg.icon.classList.add(msg.loadingIconCls);
//         msg.text.textContent = '';
//         msgBlock.classList.remove('active');
//       }, delay);
//     }
//   }
// }
