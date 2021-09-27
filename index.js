const { Client, Intents } = require('discord.js');
const sequelize = require('./config/dbConnection');
const getCommandResponse = require('./commands/index.js');
const logger = require('./utils/discordLogger');

const token = process.env.TOKEN;
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', async () => {
  console.log('Connected to Bot');
  await sequelize.sync({
    // force: true,
  });
  console.log('Connected to Database');
  logger.info({
    message: 'Production Server Online & Connected to Database',
  });
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  const { commandName } = interaction;
  getCommandResponse(commandName, interaction);
});

client.login(token);
