const getRandomQuote = require('./ramiQuote');
const setPostcode = require('./setPostcode');
const { weatherFromLocation } = require('./weather');

function getCommandResponse(command, interaction) {
  switch (command) {
    case 'ping':
      return interaction.reply('Pong');
    case 'quote':
      return interaction.reply(getRandomQuote());
    case 'setpostcode':
      return setPostcode(interaction);
    case 'weather':
      return weatherFromLocation(false, interaction);
    case 'forecast':
      return weatherFromLocation(true, interaction);
    default:
      break;
  }
}

module.exports = getCommandResponse;
