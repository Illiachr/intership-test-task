/* eslint-disable no-unused-vars */
import showGrid from '../showGrid';
import modalTemplates from './modalTemplates';
import userAuth from '../login';
import lds from './loader';
import { getData } from '../apiUtils.js/apiUtils';

export default function appTemplate(selector) {
  const app = document.querySelector(selector);
  const template = ` <div class="controls">
            <h2 class="title">Calendar</h2>
            <div id="filter"></div>
            <button class="btn js-modal-open" data-type="add-event" data-modal="modal-event">
                <span>New event</span>
                <span class="fas fa-plus"></span>
            </button>            
        </div>
        <div class="calendar-grid">
        </div>`;
  const loader = lds();
  document.body.append(loader);
  app.insertAdjacentHTML('beforeend', template);
  modalTemplates();
  getList(loader, app);
}

async function getList(loader = null, app) {
  if (loader) { loader.classList.add('active'); }
  const userList = [];
  const events = [];
  try {
    const res = await getData('users');
    const resEvents = await getData('events');
    if (res.status === 200) {
      const data = await res.json();
      data.forEach(obj => {
        const parsedData = JSON.parse(obj.data);
        const item = { id: obj.id, value: parsedData.name, role: parsedData.type };
        userList.push(item);
      });
    } else { throw new Error('Network status not 200'); }
    if (resEvents.status === 200) {
      const data = await resEvents.json();
      data.forEach(obj => {
        const parsedData = JSON.parse(obj.data);
        const item = { id: obj.id, ...parsedData };
        events.push(item);
      });
    } else { throw new Error('Network status not 200'); }
  } catch (err) {
    console.warn(err);
  } finally {
    if (loader) { loader.classList.remove('active'); }
    app.classList.add('active');
    showGrid();
    userAuth('login', userList, events);
  }
}
