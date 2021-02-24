import { team } from '../auxiliary';
import { getEventStore, render, resetGrid } from '../render';
import Select from '../UI/select/select';

export default class User {
  constructor(user, selector) {
    this.user = user;
    this.calendar = document.querySelector(selector);
    this.events = [];
    this.filtred = [];

    this.init();
  }

  init() {
    const filter = this.filter.bind(this);
    // eslint-disable-next-line no-unused-vars
    const filterByMember = new Select('#filter', {
      label: 'Filter',
      placeholder: 'Choose member...',
      defaultSeleted: '0',
      data: [
        { id: '0', value: 'All members' },
        ...team,
      ],
      onSelect(item) {
        filter(item);
      },
    });

    this.events = getEventStore();
    if (this.events.length > 0) {
      this.events.forEach(render);
    }
  }

  filter(item) {
    if (item.id === '0') {
      resetGrid();
      this.events.forEach(render);
      return;
    }
    const filtred = this.events.reduce((arr, event) => {
      event.partisipants.forEach(member => {
        if (member.id === item.id) {
          arr.push(event);
        }
      });
      return arr;
    }, []);
    this.filtred = filtred;
    resetGrid();
    console.log(filtred);
    filtred.forEach(render);
  }
}
