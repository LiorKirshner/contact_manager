const { addContact, listContacts, searchContacts, deleteContact } = require('../services/contactService');

function printUsage() {
  console.log(`Usage: node contacts.js [command] [arguments]

Commands:
  add "name" "email" "phone"  - Add a new contact
  list                        - List all contacts
  search "query"              - Search contacts by name or email
  delete "email"              - Delete contact by email
  help                        - Show this help message

Examples:
  node contacts.js add "John Doe" "john@example.com" "555-123-4567"
  node contacts.js search "john"
  node contacts.js delete "john@example.com"
`);
}

function handleCommand(args) {
  const [command, ...params] = args;

  try {
    switch (command) {
      case 'add':
        if (params.length < 3) {
          throw new Error('Missing arguments for add command');
        }
        const newContact = addContact(params[0], params[1], params[2]);
        console.log(`✓ Contact added: ${newContact.name}`);
        break;

      case 'list':
        const contacts = listContacts();
        console.log(`✓ Loaded ${contacts.length} contacts\n`);
        if (contacts.length === 0) {
          console.log('No contacts found.');
          break;
        }
        console.log('=== All Contacts ===');
        contacts.forEach((c, i) => {
          console.log(`${i + 1}. ${c.name} - ${c.email} - ${c.phone}`);
        });
        break;

      case 'search':
        if (params.length < 1) {
          throw new Error('Missing search query');
        }
        const results = searchContacts(params[0]);
        console.log(`✓ Loaded ${results.length} contacts\n`);
        console.log(`=== Search Results for "${params[0]}" ===`);
        if (results.length === 0) {
          console.log(`No contacts found matching "${params[0]}"`);
        } else {
          results.forEach((c, i) => {
            console.log(`${i + 1}. ${c.name} - ${c.email} - ${c.phone}`);
          });
        }
        break;

      case 'delete':
        if (params.length < 1) {
          throw new Error('Missing email for delete command');
        }
        const deleted = deleteContact(params[0]);
        console.log(`✓ Contact deleted: ${deleted.name}`);
        break;

      case 'help':
        printUsage();
        break;

      default:
        throw new Error(`Unknown command '${command}'`);
    }
  } catch (err) {
    console.error(`✗ Error: ${err.message}`);
    if (command !== 'help') {
      console.log('Usage: node contacts.js [add|list|search|delete|help] [arguments]');
    }
  }
}

module.exports = { handleCommand };
