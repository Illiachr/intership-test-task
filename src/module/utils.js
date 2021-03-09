import { workWeek } from './auxiliary';

export const getTimeTable = eventHours => {
  const timeTable = [];
  for (let hour = +eventHours.start; hour <= +eventHours.end; hour += +eventHours.step) {
    const eventTime = { id: `${hour}`, value: `${hour}:00` };
    timeTable.push(eventTime);
  }
  return timeTable;
};

export const capitalize = string => {
  if (typeof string !== 'string') {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getMethodName = eventName => `on${capitalize(eventName)}`;

export const firstFreeSlot = calendarElem => {
  let nextFreeTime = '';
  let lastBookedDay = '';
  workWeek.forEach(day => {
    calendarElem.querySelectorAll(`.cell[data-day="${day.id}"]`)
      .forEach(elem => {
        if (!elem.dataset.eventId || elem.dataset.eventId.trim() === '') {
          if (lastBookedDay === '' && nextFreeTime === '') {
            lastBookedDay = elem.dataset.day;
            nextFreeTime = elem.dataset.time;
          }
        }
      });
  });
  return {
    day: lastBookedDay,
    time: nextFreeTime,
  };
}; // end firstFreeSlot

// data template: { id: "value" }
export function getIdList(data) {
  const idList = [];
  data.forEach(obj => idList.push(obj.id));
  return idList;
}

// data template: { data: "{\"key\":\"value\",}" }
export function getList(data) {
  const list = [];
  data.forEach(obj => {
    const item = { id: obj.id, ...JSON.parse(obj.data) };
    list.push(item);
  });
  // return list;
}
