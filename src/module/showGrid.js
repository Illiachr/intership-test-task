import { eventHours, workWeek } from './auxiliary';

const getGridHeaderTempl = () => {
  const gridHeader = workWeek.map(day => `
        <div class="grid-header">${day.value}</div>
    `);

  return `
    <div class="row-header">
        <div class="grid-header">Time</div>
        ${gridHeader.join('')}
    </div>     
    `;
};

const getGridTemplate = hour => {
  const cellCls = ['cell', 'meeting-cell', 'js-modal-open'];
  const rowCells = workWeek
    .map(
      day => `<div class="${cellCls.join(' ')}" data-day="${day.id}" data-time="${hour}" data-modal="modal-event">
                        <span class="name" data-type="event-name"></span>
                        <span class="cancel-event fas fa-times"></span>
                    </div>`,
    );

  return `
        <div class="row-meeting" data-time="${hour}">
            <div class="cell time-cell">${hour}:00</div>
            ${rowCells.join('')}
        </div>
    `;
};

export default (selector = '.calendar-grid') => {
  const calendarGrid = document.querySelector(selector);

  calendarGrid.insertAdjacentHTML('beforeend', getGridHeaderTempl());
  for (let hour = +eventHours.start; hour <= +eventHours.end; hour += +eventHours.step) {
    calendarGrid.insertAdjacentHTML('beforeend', getGridTemplate(hour));
  }
};
