/* eslint-disable no-unused-vars */
import showGrid from '../showGrid';
import modalTemplates from './modalTemplates';
import userAuth from '../login';
import lds from './loader';
import { getData } from '../../apiUtils.js/apiUtils';

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
  // loader.classList.add('active');
  app.insertAdjacentHTML('beforeend', template);
  getList(loader, app);

  // showGrid();
  modalTemplates();
  // userAuth('login');
}

async function getList(loader = null, app) {
  if (loader) { loader.classList.add('active'); }
  const userList = [];
  try {
    const res = await getData('users');
    if (res.status === 200) {
      const data = await res.json();
      data.forEach(obj => {
        const parsedData = JSON.parse(obj.data);
        const item = { id: obj.id, value: parsedData.name, role: parsedData.type };
        userList.push(item);
      });
      console.log(userList);
    } else { throw new Error('Network status not 200'); }
  } catch (err) {
    console.warn(err);
  } finally {
    if (loader) { loader.classList.remove('active'); }
    app.classList.add('active');
    showGrid();
    userAuth('login', userList);
  }
}

// function getList() {
//  if (loader) { loader.classList.add('active'); }
//   getData('users')
//     .then(res => {
//       if (res.status !== 200) { throw new Error('Network status not 200'); }
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       const list = [];
//       data.forEach(obj => {
//         const item = { id: obj.id, ...JSON.parse(obj.data) };
//         list.push(item);
//       });
//       console.log(list);
//       // const users = getList(data);
//       // console.log(users);
//     })
//     .catch(err => console.warn(err));
// }
