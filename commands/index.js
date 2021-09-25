const getRandomQuote = require('./ramiQuote');

function getCommandResponse(command) {
  switch (command) {
    case 'ping':
      return 'Pong';
    case 'server':
      return 'Server Info';
    case 'user':
      return 'User info,';
    case 'quote':
      return getRandomQuote();
    default:
      break;
  }
}

module.exports = getCommandResponse;
