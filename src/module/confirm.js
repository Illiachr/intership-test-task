import { classes } from './auxiliary';

export default modalId => new Promise(resolve => {
  const popup = document.getElementById(modalId);

  popup.classList.add(classes.modalActive);

  const closePopup = (...args) => {
    popup.removeEventListener('click', args.clickHandler);
    popup.classList.remove(classes.modalActive);
  };

  const clickHandler = e => {
    const { target } = e;

    if (target.name === 'yes') {
      closePopup(clickHandler);
      resolve();
    }

    if (target.closest(`.${classes.triggerClose}`) ||
            target.classList.contains(classes.modalActive)
    ) {
      closePopup(clickHandler);
    }
  };

  popup.addEventListener('click', clickHandler);
});
