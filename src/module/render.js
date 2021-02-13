import { classes } from './auxiliary';

export const render = event => {
  document.querySelectorAll('.row-meeting').forEach(row => {
    if (event.time === row.dataset.time) {
      row.querySelectorAll('.meeting-cell').forEach(cell => {
        if (cell.dataset.day === event.day) {
          cell.classList.add(classes.slotBooked);
          cell.classList.remove(classes.triggerOpen);
          cell.setAttribute('data-event-id', event.id);
          cell.setAttribute('draggable', true);
          const span = cell.querySelector('.cancel-event');
          span.style.display = 'inline';
          cell.insertAdjacentHTML('afterbegin',
            `<span class="name" data-type="event-name">${event.name}</span>`);
        }
      });
    }
  });
};

export const resetGrid = () => {
  document.querySelectorAll('.row-meeting').forEach(row => {
    row.querySelectorAll('.meeting-cell').forEach(cell => {
      cell.classList.remove(classes.slotBooked);
      cell.classList.add(classes.triggerOpen);
      cell.removeAttribute('data-event-id');
      const eventTitle = cell.querySelector('[data-type="event-name"]');
      const removeEventIcon = cell.querySelector('.cancel-event');
      if (eventTitle) { eventTitle.remove(); }
      removeEventIcon.style.display = 'none';
    });
  });
};

export const getEventStore = () => {
  let eventStore = {
    events: [],
  };
  if (localStorage.getItem('eventStore')) {
    eventStore = { ...JSON.parse(localStorage.getItem('eventStore')) };
  }
  return eventStore;
};
