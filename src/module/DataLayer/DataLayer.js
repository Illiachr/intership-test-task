import Emitter from '../Emitter';
import {
  deleteData, getData, postData, updateData,
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

  init() {
    this.getData(this.usersEntity);
    this.emitter.subcribe(`${this.usersEntity}:loaded`, () => {
      this.getData(this.eventsEntity);
    });
  }

  async getData(entity) {
    try {
      const res = await getData(entity);
      if (res.status !== 200) { throw new Error(`Entity ${entity} not exists`); }
      const data = await res.json();
      if (data) {
        getDataFromJSON(data, this[entity]);
        console.log(`${entity}: `, this[entity]);
      }
      this.emitter.emit(`${entity}:loaded`);
    } catch (err) {
      // exception Decorator
      console.log('emit error');
      console.warn(err);
    }
  }

  async storeData(entity, obj) {
    try {
      const res = await postData(entity, JSON.stringify(obj));
      if (res.status !== 200) { throw new Error(`Entity ${entity} not exists`); }
      const resData = await res.json();
      // eslint-disable-next-line no-param-reassign
      this[entity].push(fromJSON(resData));
      console.log(this[entity]);
      this.emitter.emit(`${entity}:stored`, fromJSON(resData));
    } catch (err) {
      // exception Decorator
      this.emitter.emit(`${entity}:stored`, err);
      console.warn(err);
    }
  }

  async updateData(entity, index) {
    const obj = this[entity][index];
    try {
      const res = await updateData(entity, obj.id, JSON.stringify(obj));
      if (res.status !== 200) { throw new Error(`${obj.id} unreacheble or not exists`); }
      this.emitter.emit(`${entity}:updated`, true);
    } catch (err) {
      // exception Decorator
      this.emitter.emit(`${entity}:updated`, false);
      console.warn(err);
    }
  }

  async removeData(entity, id) {
    console.log(entity, id);
    try {
      const res = await deleteData(entity, id);
      console.log(`${entity}:delete`);
      if (res.status !== 204) {
        const resData = await res.json();
        throw new Error(resData.error); // проверить
      }
      const eventIndex = this.events.findIndex(event => event.id === id);
      this.events.splice(eventIndex, 1);
      this.emitter.emit(`${entity}:delete`, true);
      console.log(this.events);
    } catch (err) {
      // exception Decorator
      this.emitter.emit(`${entity}:delete`, false, err);
      console.warn(err);
    }
  }
} // end class DataLayer

function fromJSON(obj) {
  const item = { id: obj.id, ...JSON.parse(obj.data) };
  return item;
}

function getDataFromJSON(data, list) {
  data.forEach(obj => {
    list.push(fromJSON(obj));
  });
}

// const data = new DataLayer(conf.url, conf.system, conf.entities);

// console.log(data);

// data.getData(conf.entities[0]);
