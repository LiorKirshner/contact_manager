describe('app.js', () => {
  const originalArgv = process.argv;
  const originalExit = process.exit;

  beforeEach(() => {
    jest.resetModules(); // מרענן את המודולים
    console.log = jest.fn();
    console.error = jest.fn();
    process.exit = jest.fn(); // לעג ל-exit
  });

  afterEach(() => {
    process.argv = originalArgv;
    process.exit = originalExit;
    jest.clearAllMocks();
  });

  test('should print error when no command provided', () => {
    process.argv = ['node', 'contacts.js'];
    require('./app'); // מריץ את הקובץ
    expect(console.log).toHaveBeenCalledWith('✗ Error: No command provided');
    expect(process.exit).toHaveBeenCalledWith(1); // בודק שלא באמת יצא
  });
});
