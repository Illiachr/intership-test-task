/* eslint-disable no-param-reassign */
import { classes, team } from './auxiliary';
import Select from './UI/select/select';
import Admin from './User/Admin';
import User from './User/User';

export default modalId => {
  const popup = document.getElementById(modalId);
  const currentUser = {
    name: null,
    role: null,
  };
  popup.classList.add(classes.modalActive);
  // eslint-disable-next-line no-unused-vars
  const userSelect = new Select('#user-select', {
    label: 'user-select',
    placeholder: 'Choose member...',
    defaultSeleted: '0',
    data: [
      { id: '0', value: 'Choose user name' },
      ...team,
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
      closePopup(clickHandler);
      if (currentUser.role === 'user') {
        // eslint-disable-next-line no-unused-vars
        const user = new User(currentUser, '.app');
      }

      if (currentUser.role === 'admin') {
        const admin = new Admin(currentUser, '.app');
        console.log(admin);
      }
    }
  };

  popup.addEventListener('click', clickHandler);
};
