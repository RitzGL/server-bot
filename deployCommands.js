require('dotenv').config();

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong!'),
  new SlashCommandBuilder()
    .setName('quote')
    .setDescription('Replies with a quote from Rami Quotes DB!'),
  new SlashCommandBuilder()
    .setName('setpostcode')
    .setDescription('Set your postcode for the weather command')
    .addStringOption((option) =>
      option
        .setName('postcode')
        .setDescription('Enter the postcode to use for getting weather')
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName('weather')
    .setDescription("Today's weather from saved location"),
  new SlashCommandBuilder()
    .setName('weatherchannel')
    .setDescription("Today's weather from saved location sent to channel"),
  new SlashCommandBuilder()
    .setName('forecast')
    .setDescription('Weather forecast from saved location'),
  new SlashCommandBuilder()
    .setName('forecastchannel')
    .setDescription('Weather forecast from saved location sent to channel'),
].map((command) => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
