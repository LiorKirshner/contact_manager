function validateEmail(email) {
  if (!email.includes('@')) {
    throw new Error('Email must contain @ symbol');
  }
}

function validateContact(name, email, phone) {
  if (!name || !email || !phone) {
    throw new Error('Missing arguments for add command');
  }
  validateEmail(email);
}

module.exports = { validateEmail, validateContact };
