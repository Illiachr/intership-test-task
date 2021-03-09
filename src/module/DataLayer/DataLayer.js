import Emitter from '../Emitter';
import {
  fromJSON,
  getDataFromJSON,
  request,
} from './dataUtils';

const conf = {
  usersEntity: 'users',
  eventsEntity: 'events',
};

export default class DataLayer {
  constructor() {
    if (DataLayer.exsists) {
      return DataLayer.instance;
    }
    DataLayer.instance = this;
    DataLayer.exsists = true;
    this.usersEntity = conf.usersEntity;
    this.eventsEntity = conf.eventsEntity;
    this.resStatus = null;
    this.users = [];
    this.events = [];
    this.emitter = new Emitter();

    this.init();
  }

  async init() {
    await this.getData(this.usersEntity);
    await this.getData(this.eventsEntity, true);
  }

  async getData(entity, emit = false) {
    const data = await request(entity, { emitter: this.emitter });
    if (!Array.isArray(data)) {
      console.log(data);
    } else if (data.length) {
      getDataFromJSON(data, this[entity]);
      console.log(`${entity}: `, this[entity]);
    }
    if (emit) {
      this.emitter.emit(`${entity}:load`);
    }
    return data;
  }

  async storeData(entity, data) {
    const resData = await request(entity, {
      method: 'POST',
      data,
      emitter: this.emitter,
    });
    this[entity].push(fromJSON(resData));
    this.emitter.emit(`${entity}:update`, true);
  }

  async updateData(entity, index) {
    const data = this[entity][index];
    const resData = await request(entity, {
      method: 'PUT',
      id: data.id,
      data,
      emitter: this.emitter,
    });

    this.emitter.emit(`${entity}:update`, true);
    return resData;
  }

  async removeData(entity, id) {
    const err = await request(entity, {
      method: 'DELETE',
      id,
      emitter: this.emitter,
    });
    if (err !== 204) {
      console.log(err);
      this.emitter.emit(`${entity}:remove`, false, err);
      return err;
    }
    this.events = [];
    await this.getData(entity);
    this.emitter.emit(`${entity}:remove`, true);
    return err;
  }
} // end class DataLayer
