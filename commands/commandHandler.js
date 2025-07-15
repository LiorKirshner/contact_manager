// commands/commandHandler.js

const {
  addContact,
  deleteContact,
  listContacts,
  searchContacts,
} = require('../services/contactService');

function printHelp() {
  console.log(`
Contact Manager - Available commands:
  add <name> <email> <phone>     Add a new contact
  delete <name>                  Delete a contact by name
  list                           List all contacts
  search <query>                 Search contacts
  help                           Show this help message
`);
}

function handleCommand(args) {
  const [command, ...params] = args;

  try {
    switch (command) {
      case 'add': {
        const [name, email, phone] = params;
        if (!name || !email || !phone) {
          throw new Error('Usage: add <name> <email> <phone>');
        }
        addContact({ name, email, phone });
        console.log(`Contact "${name}" added successfully.`);
        break;
      }

      case 'delete': {
        const [name] = params;
        if (!name) throw new Error('Usage: delete <name>');
        deleteContact(name);
        console.log(`Contact "${name}" deleted successfully.`);
        break;
      }

      case 'list': {
        const contacts = listContacts();
        if (contacts.length === 0) {
          console.log('No contacts found.');
        } else {
          console.table(contacts);
        }
        break;
      }

      case 'search': {
        const [query] = params;
        if (!query) throw new Error('Usage: search <query>');
        const results = searchContacts(query);
        if (results.length === 0) {
          console.log('No matching contacts found.');
        } else {
          console.table(results);
        }
        break;
      }

      case 'help':
      default:
        printHelp();
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

module.exports = handleCommand;
