const modalEvent = () => {
  const template = `
    <div class="modal modal--m" id="modal-event">
        <div class="modal__dialog">
            <div class="modal__dialog-header">
                <div class="modal__dialog-header-wrapper">
                    <div class="modal__dialog-header-content"><h4>Add Event</h4></div>
                    <div class="modal__dialog-header-close">
                        <button class="js-modal-close modal__dialog-header-close-btn">
                            <span class="fas fa-times"></span>
                        </button>
                    </div>
                </div>
                <div class="modal__dialog-header-warning" id="modal-warning">
                    <span class="fas fa-exclamation-circle"></span>
                    <span class="modal__dialog-header-warning-text"></span>
                    <span class="modal__dialog-header-warning-close fas fa-times-circle"></span>
                </div>
            </div>
            <form name="event-form" id="event-form">
                <div class="modal__dialog-body">
                    <div class="control-wrapper">
                        <div class="label">Event name</div>
                        <input 
                          type="text"
                          name="name"
                          id="event-name"
                          class="name__event
                          control-input"
                          placeholder="Enter event name, please"> 
                    </div>
                    <div class="control-wrapper">
                        <div class="label">Participants</div>                   
                        <div id="participants"></div>
                    </div>
                    <div class="control-wrapper">
                        <div class="label">Day</div>
                        <div id="day"></div>
                    </div>
                    <div class="control-wrapper">
                        <div class="label">Time</div>
                        <div id="time"></div>
                    </div>
                    <div class="control-wrapper">                
                        <button name="create" type="submit" class="js-modal-submit btn">Create</button>
                        <button type="button" class="js-modal-close btn btn-close">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    `;
  document.body.insertAdjacentHTML('beforeend', template);
};

const modalRemove = () => {
  const template = `
    <div class="modal modal--s" id="event-remove">
        <div class="modal__dialog">
            <div class="modal__dialog-header">
                <div class="modal__dialog-header-content">
                    <h4>Remove event</h4>
                </div>
                <div class="modal__dialog-header-close">
                    <button class="js-modal-close modal__dialog-header-close-btn">
                        <span class="fas fa-times"></span>
                    </button>
                </div>
            </div>
            <div class="modal__dialog-body">
                Are you sure you want to delete "Event name" event?
            </div>
            <div class="modal__dialog-footer">                
                <button name="yes" type="submit" class="js-modal-submit btn">Yes</button>
                <button name="no"type="button" class="js-modal-close btn btn-close">No</button>
            </div>
        </div>
    </div>
    `;
  document.body.insertAdjacentHTML('beforeend', template);
};

const modalLogin = () => {
  const template = `
    <div class="modal modal--s" id="login">
        <div class="modal__dialog">
            <div class="modal__dialog-header">
                <div class="modal__dialog-header-content">
                    <h4>Please autorize</h4>
                </div>
            </div>
            <div class="modal__dialog-body">
                <div id="user-select"></div>
            </div>
            <div class="modal__dialog-footer">
                <button name="login" type="submit" class="js-modal-submit btn">Login</button>
            </div>
        </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', template);
};

export default () => {
  modalEvent();
  modalRemove();
  modalLogin();
};
