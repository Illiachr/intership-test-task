/* eslint-disable*/
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
        const item = { id: obj.id, ...parsedData };
        userList.push(item);
      });
    } else { throw new Error('Network status not 200'); }
    if (resEvents.status === 200) {
      const data = await resEvents.json();
      if (data) {
        data.forEach(obj => {
          const parsedData = JSON.parse(obj.data);
          const item = { id: obj.id, ...parsedData };
          events.push(item); 
        });
      }
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

async function storeEvent(events, event, closeHandler, msgBlock) {
  const delay = 6000;
  const msg = {
    icon: msgBlock.children[0],
    text: msgBlock.children[1],
    loading: 'Event store in progress...',
    success: 'New event stored',
    error: 'Something wrong, try again',
    loadingCss: 'color: #e0b411; background-color: #fdfda6',
    okCss: 'color: green; background-color: #7fef7d',
    loadinIconCls: 'fa-sync-alt',
    okIconCls: 'fa-check',
  };

  let status = 0;

  msg.icon.classList.remove('fa-exclamation-circle');
  msg.icon.classList.add(msg.loadinIconCls);
  msgBlock.style.cssText = msg.loadingCss;
  msg.text.textContent = msg.loading;
  msgBlock.classList.add('active');
  const eventJson = JSON.stringify(event);
  try {
    const res = await postData('events', eventJson);
    status = res.status;
    const data = await res.json();
    event.id = data.id;
    events.push(event);
    console.log(events);
    render(event);
    msg.icon.classList.remove(msg.loadinIconCls);
    msg.icon.classList.add(msg.okIconCls);
    msgBlock.style.cssText = msg.okCss;
    msg.text.textContent = msg.success;
  } catch (err) {
    msg.icon.classList.remove(msg.okIconCls);
    msg.icon.classList.add('fa-exclamation-circle');
    msgBlock.style.cssText = '';
    msg.text.textContent = msg.error;
    console.warn(err);
  } finally {
    if (status === 200) {
      setTimeout(() => {
        closeHandler();
        msg.icon.classList.remove(msg.okIconCls);
        msg.icon.classList.add('fa-exclamation-circle');
        msgBlock.style.cssText = '';
        msg.text.textContent = '';
        msgBlock.classList.remove('active');
      }, delay);
    }
  }
}

async function updateEvent(events, eventIndex, msgBlock) {
  const delay = 10000;
  const msg = {
    icon: msgBlock.children[0],
    text: msgBlock.children[1],
    loading: 'Updating event...',
    success: 'Event updated',
    error: 'Something wrong, try again',
    loadingIconCls: 'fa-sync-alt',
    okIconCls: 'fa-check',
    erorrIconCls: 'fa-exclamation-circle',
  };

  let status = 0;

  // eslint-disable-next-line no-param-reassign
  msg.text.textContent = msg.loading;
  msgBlock.classList.add('active');

  const eventJson = JSON.stringify(events[eventIndex]);
  try {
    const res = await updateData('events', events[eventIndex].id, eventJson);
    status = res.status;
    resetGrid();
    events.forEach(render);
    msg.icon.classList.remove(msg.loadingIconCls);
    msg.icon.classList.add(msg.okIconCls);
    msg.text.textContent = msg.success;
  } catch (err) {
    msg.icon.classList.remove(msg.okIconCls);
    msg.icon.classList.add(msg.erorrIconCls);
    msg.text.textContent = msg.error;
    console.warn(err);
  } finally {
    if (status === 200) {
      setTimeout(() => {
        msg.icon.classList.remove(msg.okIconCls);
        msg.icon.classList.add(msg.loadingIconCls);
        msg.text.textContent = '';
        msgBlock.classList.remove('active');
      }, delay);
    }
  }
}

async function removeEventApi(entityName, events, elem, msgBlock) {
  const delay = 10000;
  const msg = {
    icon: msgBlock.children[0],
    text: msgBlock.children[1],
    loading: 'Removing event...',
    success: 'Event removed',
    error: 'Something wrong, try again',
    loadingIconCls: 'fa-sync-alt',
    okIconCls: 'fa-check',
    erorrIconCls: 'fa-exclamation-circle',
  };

  let status = 0;

  // eslint-disable-next-line no-param-reassign
  msg.text.textContent = msg.loading;
  msgBlock.classList.add('active');

  try {
    const res = await deleteData(entityName, elem.dataset.eventId);
    status = res.status;
    removeEvent(events, elem);
    msg.icon.classList.remove(msg.loadingIconCls);
    msg.icon.classList.add(msg.okIconCls);
    msg.text.textContent = msg.success;
  } catch (err) {
    msg.icon.classList.remove(msg.okIconCls);
    msg.icon.classList.add(msg.erorrIconCls);
    msg.text.textContent = msg.error;
    console.warn(err);
  } finally {
    if (status === 204) {
      console.log(status);
      setTimeout(() => {
        msg.icon.classList.remove(msg.okIconCls);
        msg.icon.classList.add(msg.loadingIconCls);
        msg.text.textContent = '';
        msgBlock.classList.remove('active');
      }, delay);
    }
  }
}
