const fs = require('fs');
const path = require('path');

const contactsFile = path.join(__dirname, '..', 'contacts.json');

function loadContacts() {
  try {
    const data = fs.readFileSync(contactsFile, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('✗ File not found - creating new contact list');
      return [];
    } else {
      throw err;
    }
  }
}

function saveContacts(contacts) {
  try {
    fs.writeFileSync(contactsFile, JSON.stringify(contacts, null, 2), 'utf-8');
  } catch (err) {
    throw new Error('Failed to save contacts');
  }
}

module.exports = { loadContacts, saveContacts };
