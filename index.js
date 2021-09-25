const { Client, Intents } = require('discord.js');
const getCommandResponse = require('./commands/index.js');
const logger = require('./utils/discordLogger');

const token = process.env.TOKEN;
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
  console.log('ready');
  logger.info({
    message: 'Server Online',
  });
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  const { commandName } = interaction;
  await interaction.reply(getCommandResponse(commandName));
});

client.login(token);
