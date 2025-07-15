// utils/fileUtils.js

const fs = require('fs');
const path = require('path');

const CONTACTS_FILE = path.join(__dirname, '..', 'contacts.json');

function loadContacts() {
  try {
    if (!fs.existsSync(CONTACTS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(CONTACTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading contacts file:', err.message);
    return [];
  }
}

function saveContacts(contacts) {
  try {
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving contacts file:', err.message);
  }
}

module.exports = {
  loadContacts,
  saveContacts,
};
