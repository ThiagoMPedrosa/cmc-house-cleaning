import store from './dataStore.js';
import { getCleaner } from './cleanerManager.js';
import { getClient } from './clientManager.js';

export function createAppointment(date, clientId, cleanerId) {
  const client = getClient(clientId);
  const cleaner = getCleaner(cleanerId);
  
  if (!client || !cleaner) {
    throw new Error('Invalid client or cleaner ID');
  }

  const appointment = {
    id: store.appointments.length + 1,
    date,
    clientId,
    cleanerId,
    status: 'scheduled'
  };

  store.appointments.push(appointment);
  return appointment;
}

export function getAppointment(id) {
  return store.appointments.find(appointment => appointment.id === id);
}

export function getAllAppointments() {
  return store.appointments;
}

export function updateAppointmentStatus(id, status) {
  const appointment = getAppointment(id);
  if (appointment) {
    appointment.status = status;
    return appointment;
  }
  return null;
}
