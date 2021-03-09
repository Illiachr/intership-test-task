export default class Emitter {
  constructor() {
    if (Emitter.exsists) {
      return Emitter.instance;
    }
    Emitter.instance = this;
    Emitter.exsists = true;
    this.listeners = {};
  }

  emit(event, ...args) {
    console.log('emit', event);
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }
    this.listeners[event].forEach(listener => {
      listener(...args);
    });
    return true;
  }

  subcribe(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);

    return () => {
      this.listeners[event] =
        this.listeners[event].filter(listener => listener !== fn);
    };
  }
}
