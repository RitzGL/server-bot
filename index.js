require('dotenv').config();

const { Client, Intents } = require('discord.js');

const token = process.env.TOKEN;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const getRandomQuote = require('./commands/ramiQuote');

client.once('ready', () => {
  console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    await interaction.reply('Pong!');
  } else if (commandName === 'server') {
    await interaction.reply('Server info.');
  } else if (commandName === 'user') {
    await interaction.reply('User info.');
  } else if (commandName === 'quote') {
    await interaction.reply(getRandomQuote());
  }
});

client.login(token);
