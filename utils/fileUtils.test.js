const fs = require('fs');
const path = require('path');
const { loadContacts, saveContacts } = require('../utils/fileUtils');

jest.mock('fs');

describe('fileUtils', () => {
  const contactsFile = path.join(__dirname, '..', 'contacts.json');

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('loadContacts', () => {
    test('should load contacts from file', () => {
      const fakeData = JSON.stringify([{ name: 'John' }]);
      fs.readFileSync.mockReturnValue(fakeData);
      
      const result = loadContacts();
      expect(fs.readFileSync).toHaveBeenCalledWith(contactsFile, 'utf-8');
      expect(result).toEqual([{ name: 'John' }]);
    });

    test('should return empty array and log if file not found', () => {
      fs.readFileSync.mockImplementation(() => { 
        const err = new Error('File not found');
        err.code = 'ENOENT';
        throw err;
      });
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

      const result = loadContacts();
      expect(result).toEqual([]);
      expect(consoleSpy).toHaveBeenCalledWith('✗ File not found - creating new contact list');

      consoleSpy.mockRestore();
    });

    test('should throw error for other fs errors', () => {
      fs.readFileSync.mockImplementation(() => {
        const err = new Error('Other error');
        err.code = 'EACCES';
        throw err;
      });
      expect(() => loadContacts()).toThrow('Other error');
    });
  });

  describe('saveContacts', () => {
    test('should save contacts to file', () => {
      expect(() => saveContacts([{ name: 'John' }])).not.toThrow();
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        contactsFile,
        JSON.stringify([{ name: 'John' }], null, 2),
        'utf-8'
      );
    });

    test('should throw error on write failure', () => {
      fs.writeFileSync.mockImplementation(() => {
        throw new Error('Write failed');
      });
      expect(() => saveContacts([])).toThrow('Failed to save contacts');
    });
  });
});
