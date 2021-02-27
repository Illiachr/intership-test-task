import { workWeek } from './auxiliary';

export const capitalize = string => {
  if (typeof string !== 'string') {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const firstFreeSlot = calendar => {
  let nextFreeTime = '';
  let lastBookedDay = '';
  workWeek.forEach(day => {
    calendar.querySelectorAll(`.cell[data-day="${day.id}"]`)
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
  const users = [];
  data.forEach(obj => {
    const user = { id: obj.id, ...JSON.parse(obj.data) };
    users.push(user);
  });
  return users;
}
