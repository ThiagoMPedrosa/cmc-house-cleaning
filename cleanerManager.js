import store from './dataStore.js';

export function addCleaner(name, phone) {
  const cleaner = { id: store.cleaners.length + 1, name, phone };
  store.cleaners.push(cleaner);
  return cleaner;
}

export function getCleaner(id) {
  return store.cleaners.find(cleaner => cleaner.id === id);
}

export function getAllCleaners() {
  return store.cleaners;
}
