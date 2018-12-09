export default () => {
  function eventTrigger (detail) {
    window.dispatchEvent(new CustomEvent('localStorage', { detail }));
  }

  window.Storage.prototype.setItemNative = window.Storage.prototype.setItem;
  window.Storage.prototype.removeItemNative = window.Storage.prototype.removeItem;
  window.Storage.prototype.clearNative = window.Storage.prototype.clear;

  window.Storage.prototype.setItem = function(key, value) {
    setTimeout(() => {
      eventTrigger({ action: 'set', key, value });
    });
    this.setItemNative(key, value); // async로 동작하면 안됨
  };

  window.Storage.prototype.removeItem = function(key) {
    setTimeout(() => {
      eventTrigger({ action: 'remove', key });
    });
    this.removeItemNative(key); // async로 동작하면 안됨
  };

  window.Storage.prototype.clear = function() {
    setTimeout(() => {
      eventTrigger({ action: 'clear' });
    });
    this.clearNative(); // async로 동작하면 안됨
  };

  window.storageEventTrigger = function(action, key, value) {
    setTimeout(() => {
      eventTrigger({ action, key, value });
    });
  };
}
