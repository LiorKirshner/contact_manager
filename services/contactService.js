// services/contactService.js

const { loadContacts, saveContacts } = require('../utils/fileUtils');
const { validateContact } = require('../utils/validation');

function addContact(contact) {
  validateContact(contact);
  const contacts = loadContacts();
  const exists = contacts.some(c => c.name === contact.name);
  if (exists) {
    throw new Error(`Contact with name "${contact.name}" already exists.`);
  }
  contacts.push(contact);
  saveContacts(contacts);
}

function deleteContact(name) {
  const contacts = loadContacts();
  const filtered = contacts.filter(c => c.name !== name);
  if (contacts.length === filtered.length) {
    throw new Error(`No contact found with name "${name}".`);
  }
  saveContacts(filtered);
}

function listContacts() {
  return loadContacts();
}

function searchContacts(query) {
  const contacts = loadContacts();
  return contacts.filter(c =>
    c.name.includes(query) ||
    c.email.includes(query) ||
    c.phone.includes(query)
  );
}

module.exports = {
  addContact,
  deleteContact,
  listContacts,
  searchContacts,
};
