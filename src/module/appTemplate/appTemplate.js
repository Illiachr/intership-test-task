/* eslint-disable no-unused-vars */
import showGrid from '../showGrid';
import modalTemplates from './modalTemplates';
import userAuth from '../login';
import lds from './loader';
import { getData } from '../apiUtils/apiUtils';
import DataLayer from '../DataLayer/DataLayer';
import Emitter from '../Emitter';
import Calendar from '../Calendar/Calendar';

export default function appTemplate(selector) {
  const app = document.querySelector(selector);
  const template = `
        <div class="controls">
          <div class="controls__title-wrapper">
            <h2 class="title">Calendar</h2>
            <div class="controls__title-warning" data-type="controls-warning">
              <span class="fas fa-sync-alt"></span>
              <span class="controls__title-warning-text"></span>
            </div>
          </div>
          <div id="filter"></div>
          <button class="btn js-modal-open" data-type="add-event" data-modal="modal-event">
              <span>New event</span>
              <span class="fas fa-plus"></span>
          </button>            
        </div>
        <div class="calendar-grid">
        </div>`;
  const loader = lds();
  const dataLayer = new DataLayer();
  const emitter = new Emitter();

  document.body.append(loader);
  loader.classList.add('active');
  app.insertAdjacentHTML('beforeend', template);
  modalTemplates();

  emitter.subcribe('events:load', () => {
    loader.classList.remove('active');
    app.classList.add('active');
    showGrid();
    userAuth('login');
  });
  emitter.subcribe('login:passed', user => {
    console.log(user);
    const calendar = new Calendar(selector, user);
  });
}
