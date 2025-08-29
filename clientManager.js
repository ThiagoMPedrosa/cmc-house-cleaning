import store from './dataStore.js';

export function addClient(name, address, phone) {
  const client = { id: store.clients.length + 1, name, address, phone };
  store.clients.push(client);
  return client;
}

export function getClient(id) {
  return store.clients.find(client => client.id === id);
}

export function getAllClients() {
  return store.clients;
}
