import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { addCleaner, getAllCleaners } from './cleanerManager.js';
import { addClient, getAllClients } from './clientManager.js';
import { createAppointment, getAllAppointments, updateAppointmentStatus } from './appointmentManager.js';

const rl = readline.createInterface({ input, output });

import Script from "next/script"

export default function App({ Component, pageProps }) {
  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      <Component {...pageProps} />
    </>
  )
}

async function displayMenu() {
  console.log('\n--- House Cleaning Service ---');
  console.log('1. Add Cleaner');
  console.log('2. Add Client');
  console.log('3. Create Appointment');
  console.log('4. List Cleaners');
  console.log('5. List Clients');
  console.log('6. List Appointments');
  console.log('7. Update Appointment Status');
  console.log('8. Exit');
  const answer = await rl.question('Select an option: ');
  await handleOption(answer);
}

async function handleOption(option) {
  switch (option) {
    case '1':
      await addCleanerPrompt();
      break;
    case '2':
      await addClientPrompt();
      break;
    case '3':
      await createAppointmentPrompt();
      break;
    case '4':
      listCleaners();
      break;
    case '5':
      listClients();
      break;
    case '6':
      listAppointments();
      break;
    case '7':
      await updateAppointmentStatusPrompt();
      break;
    case '8':
      rl.close();
      return;
    default:
      console.log('Invalid option');
  }
  await displayMenu();
}

async function addCleanerPrompt() {
  const name = await rl.question('Enter cleaner name: ');
  const phone = await rl.question('Enter cleaner phone: ');
  const cleaner = addCleaner(name, phone);
  console.log('Cleaner added:', cleaner);
}

async function addClientPrompt() {
  const name = await rl.question('Enter client name: ');
  const address = await rl.question('Enter client address: ');
  const phone = await rl.question('Enter client phone: ');
  const client = addClient(name, address, phone);
  console.log('Client added:', client);
}

async function createAppointmentPrompt() {
  const date = await rl.question('Enter appointment date (YYYY-MM-DD): ');
  const clientId = await rl.question('Enter client ID: ');
  const cleanerId = await rl.question('Enter cleaner ID: ');
  try {
    const appointment = createAppointment(date, parseInt(clientId), parseInt(cleanerId));
    console.log('Appointment created:', appointment);
  } catch (error) {
    console.error('Error creating appointment:', error.message);
  }
}

function listCleaners() {
  console.log('Cleaners:', getAllCleaners());
}

function listClients() {
  console.log('Clients:', getAllClients());
}

function listAppointments() {
  console.log('Appointments:', getAllAppointments());
}

async function updateAppointmentStatusPrompt() {
  const id = await rl.question('Enter appointment ID: ');
  const status = await rl.question('Enter new status (scheduled/completed/cancelled): ');
  const updatedAppointment = updateAppointmentStatus(parseInt(id), status);
  if (updatedAppointment) {
    console.log('Appointment updated:', updatedAppointment);
  } else {
    console.log('Appointment not found');
  }
}

// Start the application
displayMenu();
