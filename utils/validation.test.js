const { validateEmail, validateContact } = require('../utils/validation');

describe('validation utils', () => {
  describe('validateEmail', () => {
    test('should not throw for valid email', () => {
      expect(() => validateEmail('test@example.com')).not.toThrow();
    });

    test('should throw error for invalid email', () => {
      expect(() => validateEmail('invalid-email')).toThrow('Email must contain @ symbol');
    });
  });

  describe('validateContact', () => {
    test('should throw error if name, email, or phone missing', () => {
      expect(() => validateContact(null, 'a@b.com', '123')).toThrow('Missing arguments for add command');
      expect(() => validateContact('Name', '', '123')).toThrow('Missing arguments for add command');
      expect(() => validateContact('Name', 'a@b.com', null)).toThrow('Missing arguments for add command');
    });

    test('should throw error if email invalid', () => {
      expect(() => validateContact('Name', 'invalidemail', '123')).toThrow('Email must contain @ symbol');
    });

    test('should not throw if all valid', () => {
      expect(() => validateContact('Name', 'a@b.com', '123')).not.toThrow();
    });
  });
});
