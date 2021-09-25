require('dotenv').config();
const { Client, Intents } = require('discord.js');

const token = process.env.TOKEN;
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const getCommandResponse = require('./commands');

client.once('ready', () => {
  console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  const { commandName } = interaction;
  await interaction.reply(getCommandResponse(commandName));
});

client.login(token);
