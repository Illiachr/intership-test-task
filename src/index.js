import './index.html';
import './css/style.css';
import './scss/style.scss';
import BlockContainer from './module/BlockContainer/BlockContainer';
import { appHeader, loginModal } from './module/model';
import showGrid from './module/showGrid';
import userAuth from './module/login';
import DomElement from './module/UI/DomElement/DomElement';
// import Modal from './module/UI/Modal/Modal';

const header = new BlockContainer('#app', ['controls'], appHeader);
const table = new BlockContainer('#app', ['calendar-grid']);
// const login = new Modal('login', ['modal', 'modal--s'], loginModal);
header.render();
table.render();
showGrid();

const modalLogin = new DomElement('div', {
  id: 'login',
  classes: ['modal', 'modal--s'],
});
const modalWrapper = new DomElement('div', { classes: ['modal__dialog'] });

const modalHeader = new DomElement('div', { classes: ['modal__dialog-header'] });
const modalHeaderCnt = new DomElement('div', { classes: ['modal__dialog-header-content'] });
const modalTitle = new DomElement('h4', {}, 'Please autorize');

const modalBody = new DomElement('div', { classes: ['modal__dialog-body'] });
const modalUserSelect = new DomElement('div', { id: 'user-select' });

const modalFooter = new DomElement('div', { classes: ['modal__dialog-footer'] });
const modalLoginBtn = new DomElement('button', { classes: ['js-modal-submit btn'] }, 'Login');

modalLogin.add(document.body);
modalWrapper.add(modalLogin.elem);

modalHeader.add(modalWrapper.elem);
modalHeaderCnt.add(modalHeader.elem);
modalTitle.add(modalHeaderCnt.elem);

modalBody.add(modalWrapper.elem);
modalUserSelect.add(modalBody.elem);

modalFooter.add(modalWrapper.elem);
modalLoginBtn.add(modalFooter.elem);
modalLoginBtn.elem.name = 'login';
modalLoginBtn.elem.type = 'button';

userAuth('login');
