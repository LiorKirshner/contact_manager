const { handleCommand } = require('./commands/commandHandler');


function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('✗ Error: No command provided');
    console.log('Usage: node contacts.js [add|list|search|delete|help] [arguments]');
    process.exit(1);
  }
  handleCommand(args);
}

main();
