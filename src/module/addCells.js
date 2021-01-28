export default (selector = '.calendar-grid') => {
    const calendarGrid = document.querySelector(selector);

    for (let i = 10; i < 19; i += 1) {
        calendarGrid.insertAdjacentHTML('beforeend', `
            <div class="row-meeting" data-time="${i}">
                <div class="cell time-cell">${i}:00</div>
                <div class="cell meeting-cell js-modal-open" data-day="1" data-modal="modal-event">
                    <span class="cancel-event">&times;</span>
                </div>
                <div class="cell meeting-cell js-modal-open" data-day="2" data-modal="modal-event">
                    <span class="cancel-event">&times;</span>
                </div>
                <div class="cell meeting-cell js-modal-open" data-day="3" data-modal="modal-event">
                    <span class="cancel-event">&times;</span>
                </div>
                <div class="cell meeting-cell js-modal-open" data-day="4" data-modal="modal-event">
                    <span class="cancel-event">&times;</span>
                </div>
                <div class="cell meeting-cell js-modal-open" data-day="5" data-modal="modal-event">
                    <span class="cancel-event">&times;</span>
                </div>
            </div>
        `);
    }
};
