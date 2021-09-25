const { default: DiscordLogger } = require('node-discord-logger');
const os = require('os');

const logger = new DiscordLogger({
  hook: process.env.DISCORD_WEBHOOK,
  icon: ' https://cdn-icons-png.flaticon.com/512/919/919825.png', // optional, will be included as an icon in the footer
  serviceName: `RamiBot Production on ${os.hostname}`, // optional, will be included as text in the footer
  // defaultMeta: {
  //   // optional, will be added to all the messages
  //   'Process ID': process.pid,
  //   Host: os.hostname(), // import os from 'os';
  // },
  errorHandler: (err) => {
    // optional, if you don't want this library to log to console
    // console.error('error from discord', err);
  },
});

module.exports = logger;
