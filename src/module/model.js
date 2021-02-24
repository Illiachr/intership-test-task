import TitleBlock from './UI/TitleBlock/TitleBlock';
import DivBlock from './UI/DivBlock/DivBlock';
import AddEventBtnBlock from './UI/ButtonBlock/AddEventBtnBlock';
import ButtonBlock from './UI/ButtonBlock/ButtonBlock';

/* eslint-disable import/prefer-default-export */
export const appHeader = [
  new TitleBlock(
    'Calendar',
    {
      tag: 'h2',
      classes: ['title'],
    },
  ),
  new DivBlock(
    '',
    {
      tag: 'div',
      id: ['filter'],
    },
  ),
  new AddEventBtnBlock(
    'New event',
    {
      tag: 'button',
      classes: ['btn', 'js-modal-open'],
      iconClassses: ['fas', 'fa-plus'],
      dataSet: ['data-type="add-event"', 'data-modal="modal-event"'],
    },
  ),
];

export const loginModal = [
  {
    modalHeader: {
      content: [
        new TitleBlock(
          'Please autorize',
          {
            tag: 'h4',
            classes: [''],
          },
        ),
      ],
      options: {
        tag: 'div',
        classes: ['modal__dialog-header-content'],
      },
    },
  },
  {
    modalBody: {
      content: [
        new DivBlock(
          '',
          {
            tag: 'div',
            id: ['user-select'],
          },
        ),
      ],
      options: {
        classes: ['modal__dialog-body'],
      },
    },
  },
  {
    modalFooter: {
      content: [
        new ButtonBlock(
          'Login',
          {
            tag: 'button',
            name: 'login',
            type: 'submit',
            classes: ['js-modal-submit', 'btn'],
          },
        ),
      ],
      options: {
        classes: ['modal__dialog-body'],
      },
    },
  },
];
