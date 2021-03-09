/* eslint-disable no-param-reassign */
import { classes } from './auxiliary';
import DataLayer from './DataLayer/DataLayer';
import Emitter from './Emitter';
import { Select } from './UI/Select/Select';
import UserFactory from './User/UserFactory';

export default modalId => {
  const popup = document.getElementById(modalId);
  const dataLayer = new DataLayer();
  const currentUser = {
    name: null,
    role: null,
  };
  const userFactory = new UserFactory();
  const emitter = new Emitter();
  popup.classList.add(classes.modalActive);
  // eslint-disable-next-line no-unused-vars
  const userSelect = new Select('#user-select', {
    label: 'user-select',
    placeholder: 'Choose member...',
    defaultSeleted: '0',
    data: [
      { id: '0', value: 'Choose user name' },
      ...dataLayer.users,
    ],
    onSelect(user) {
      currentUser.name = user.value;
      currentUser.role = user.role;
    },
  });

  const closePopup = (...args) => {
    popup.removeEventListener('click', args.clickHandler);
    popup.classList.remove(classes.modalActive);
  };

  const clickHandler = e => {
    if (e.target.name === 'login' &&
        currentUser.name &&
        currentUser.role) {
      const user = userFactory.create(currentUser.name, currentUser.role);
      emitter.emit('login:passed', user);
      closePopup(clickHandler);
    }
  };

  popup.addEventListener('click', clickHandler);
};
