// __tests__/commandHandler.test.js
const { handleCommand } = require('../commands/commandHandler');
const contactService = require('../services/contactService');

jest.mock('../services/contactService');

describe('commandHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('add command calls addContact and logs success', () => {
    contactService.addContact.mockReturnValue({ name: 'John' });

    handleCommand(['add', 'John', 'john@example.com', '123']);
    expect(contactService.addContact).toHaveBeenCalledWith('John', 'john@example.com', '123');
    expect(console.log).toHaveBeenCalledWith('✓ Contact added: John');
  });

  test('list command calls listContacts and logs contacts', () => {
    contactService.listContacts.mockReturnValue([{ name: 'John', email: 'john@example.com', phone: '123' }]);

    handleCommand(['list']);
    expect(contactService.listContacts).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('✓ Loaded 1 contacts'));
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('1. John - john@example.com - 123'));
  });

  test('search command logs results', () => {
    contactService.searchContacts.mockReturnValue([{ name: 'John', email: 'john@example.com' }]);

    handleCommand(['search', 'john']);
    expect(contactService.searchContacts).toHaveBeenCalledWith('john');
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('✓ Loaded 1 contacts'));
  });

  test('delete command deletes contact and logs success', () => {
    contactService.deleteContact.mockReturnValue({ name: 'John' });

    handleCommand(['delete', 'john@example.com']);
    expect(contactService.deleteContact).toHaveBeenCalledWith('john@example.com');
    expect(console.log).toHaveBeenCalledWith('✓ Contact deleted: John');
  });

  test('unknown command logs error', () => {
    handleCommand(['unknown']);
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Unknown command'));
  });

  test('missing arguments for add command throws error', () => {
    handleCommand(['add', 'onlyname']);
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Missing arguments for add command'));
  });

  describe('commandHandler edgeCases', () => {
  test('search command missing query logs error', () => {
    handleCommand(['search']);
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Missing search query'));
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Usage: node contacts.js'));
  });

  test('delete command missing email logs error', () => {
    handleCommand(['delete']);
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Missing email for delete command'));
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Usage: node contacts.js'));
  });

  test('list command with empty contacts logs no contacts found', () => {
    contactService.listContacts.mockReturnValue([]);
    handleCommand(['list']);
    expect(console.log).toHaveBeenCalledWith('No contacts found.');
  });

  test('search command with no results logs no contacts found message', () => {
    contactService.searchContacts.mockReturnValue([]);
    handleCommand(['search', 'notfound']);
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('No contacts found matching "notfound"'));
  });

  test('help command prints usage', () => {
    handleCommand(['help']);
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Usage: node contacts.js'));
  });

  test('no command provided logs error and usage', () => {
    handleCommand([]);
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Unknown command'));
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Usage: node contacts.js'));
  });
});


});
