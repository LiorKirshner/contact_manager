// app.js
const handleCommand = require("./commands/commandHandler");

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('No command provided. Type "help" for a list of commands.');
    return;
  }
  handleCommand(args);
}

main();
