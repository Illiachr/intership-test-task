import Emitter from '../Emitter';
import { getData, postData, updateData } from './dataUtils';

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
      const data = await res.json();
      // eslint-disable-next-line no-param-reassign
      obj.id = data.id;
      this[entity].push(obj);
      console.log(this[entity]);
      this.emitter.emit(`${entity}:stored`, true);
    } catch (err) {
      // exception Decorator
      this.emitter.emit(`${entity}:stored`, false);
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
} // end class DataLayer

function getDataFromJSON(data, list) {
  data.forEach(obj => {
    const item = { id: obj.id, ...JSON.parse(obj.data) };
    list.push(item);
  });
}

// const data = new DataLayer(conf.url, conf.system, conf.entities);

// console.log(data);

// data.getData(conf.entities[0]);
