// Here is our constructor function, available globally (set to the window object!)
class EventEmitter {
  constructor() {
    this.subscribers = {};
  }

  on(eventName, eventListener) {
    if (!this.subscribers[eventName]) {
      this.subscribers[eventName] = [];
    }
    this.subscribers[eventName].push(eventListener);

  }

  emit(eventName) {
    if (!this.subscribers[eventName]) {
      return;
    }

    var remainingArgs = [].slice.call(arguments, 1);

    this.subscribers[eventName].forEach(function (listener) {
      listener.apply(null, remainingArgs);
    });
  }
}

window.EventEmitter = EventEmitter;
