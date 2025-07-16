const { addContact, listContacts, searchContacts, deleteContact } = require('../services/contactService');
const fileUtils = require('../utils/fileUtils');
const validation = require('../utils/validation');

jest.mock('../utils/fileUtils');
jest.mock('../utils/validation');

describe('contactService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('addContact', () => {
    test('should add new contact', () => {
      fileUtils.loadContacts.mockReturnValue([]);
      validation.validateContact.mockImplementation(() => {});

      const contact = { name: 'John', email: 'john@example.com', phone: '123' };
      const result = addContact(contact.name, contact.email, contact.phone);

      expect(validation.validateContact).toHaveBeenCalledWith(contact.name, contact.email, contact.phone);
      expect(fileUtils.saveContacts).toHaveBeenCalledWith([contact]);
      expect(result).toEqual(contact);
    });

    test('should throw if email already exists', () => {
      fileUtils.loadContacts.mockReturnValue([{ email: 'john@example.com' }]);
      validation.validateContact.mockImplementation(() => {});

      expect(() => addContact('John', 'john@example.com', '123')).toThrow('Contact with this email already exists');
    });
  });

  describe('listContacts', () => {
    test('should return loaded contacts', () => {
      const contacts = [{ name: 'John' }];
      fileUtils.loadContacts.mockReturnValue(contacts);

      expect(listContacts()).toBe(contacts);
    });
  });

  describe('searchContacts', () => {
    test('should filter contacts by name or email', () => {
      const contacts = [
        { name: 'John', email: 'john@example.com' },
        { name: 'Alice', email: 'alice@domain.com' }
      ];
      fileUtils.loadContacts.mockReturnValue(contacts);

      expect(searchContacts('john')).toEqual([contacts[0]]);
      expect(searchContacts('domain')).toEqual([contacts[1]]);
      expect(searchContacts('nomatch')).toEqual([]);
    });
  });

  describe('deleteContact', () => {
    test('should delete contact by email', () => {
      const contacts = [{ name: 'John', email: 'john@example.com' }, { email: 'alice@domain.com' }];
      fileUtils.loadContacts.mockReturnValue(contacts);
      fileUtils.saveContacts.mockImplementation(() => {});

      const deleted = deleteContact('john@example.com');
      expect(deleted).toEqual({ name: 'John', email: 'john@example.com' });
      expect(fileUtils.saveContacts).toHaveBeenCalledWith([{ email: 'alice@domain.com' }]);
    });

    test('should throw if contact not found', () => {
      fileUtils.loadContacts.mockReturnValue([]);
      expect(() => deleteContact('notfound@example.com')).toThrow('No contact found with email: notfound@example.com');
    });
  });
});
