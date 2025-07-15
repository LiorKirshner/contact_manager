const { loadContacts, saveContacts } = require('../utils/fileUtils');
const { validateContact } = require('../utils/validation');

function addContact(name, email, phone) {
  const contacts = loadContacts();
  validateContact(name, email, phone);

  const exists = contacts.find(c => c.email === email);
  if (exists) {
    throw new Error('Contact with this email already exists');
  }

  const newContact = { name, email, phone };
  contacts.push(newContact);
  saveContacts(contacts);

  return newContact;
}

function listContacts() {
  return loadContacts();
}

function searchContacts(query) {
  const contacts = loadContacts();
  const lowerQuery = query.toLowerCase();

  return contacts.filter(c =>
    c.name.toLowerCase().includes(lowerQuery) || c.email.toLowerCase().includes(lowerQuery)
  );
}

function deleteContact(email) {
  const contacts = loadContacts();
  const index = contacts.findIndex(c => c.email === email);

  if (index === -1) {
    throw new Error(`No contact found with email: ${email}`);
  }

  const [deleted] = contacts.splice(index, 1);
  saveContacts(contacts);
  return deleted;
}

module.exports = { addContact, listContacts, searchContacts, deleteContact };
