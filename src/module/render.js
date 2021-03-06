import { getData } from './apiUtils/apiUtils';
import { classes } from './auxiliary';

export const render = (event, canRemove = false) => {
  document.querySelectorAll('.row-meeting').forEach(row => {
    if (event.time === row.dataset.time) {
      row.querySelectorAll('.meeting-cell').forEach(eventSlot => {
        if (eventSlot.dataset.day === event.day) {
          const eventSlotChildren = eventSlot.children;
          eventSlot.classList.add(classes.slotBooked);
          eventSlot.classList.remove(classes.triggerOpen);
          eventSlot.setAttribute('data-event-id', event.id);
          eventSlot.setAttribute('draggable', true);
          eventSlotChildren[0].textContent = event.name;
          if (canRemove) {
            eventSlotChildren[1].style.display = 'inline';
          }
        }
      });
    }
  });
};

export const resetGrid = () => {
  document.querySelectorAll('.row-meeting').forEach(row => {
    row.querySelectorAll('.meeting-cell').forEach(eventSlot => {
      const eventSlotChildren = eventSlot.children;
      eventSlot.classList.remove(classes.slotBooked);
      eventSlot.classList.add(classes.triggerOpen);
      eventSlot.removeAttribute('data-event-id');
      eventSlot.removeAttribute('draggable', true);
      eventSlotChildren[0].textContent = '';
      eventSlotChildren[1].style.display = 'none';
    });
  });
};

export const getEventStore = () => {
  let eventStore = [];
  if (localStorage.getItem('eventStore')) {
    eventStore = JSON.parse(localStorage.getItem('eventStore'));
  }
  return eventStore;
};

export async function getEventsFromApi(events, entityName = 'events') {
  const eventList = [];
  try {
    const res = await getData(entityName);
    const data = await res.json();
    data.forEach(obj => {
      const parsedData = JSON.parse(obj.data);
      const item = { id: obj.id, ...parsedData };
      eventList.push(item);
    });
  } catch (err) {
    console.warn(err);
  } finally {
    // eslint-disable-next-line no-param-reassign
    events = eventList;
    if (events.length > 0) {
      eventList.forEach(render);
    }
  }
}
