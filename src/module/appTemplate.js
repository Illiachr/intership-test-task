import showGrid from './showGrid';
import modalTemplates from './modalTemplates';
import userAuth from './login';

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
  app.insertAdjacentHTML('beforeend', template);
  showGrid();
  modalTemplates();
  userAuth('login');
}
