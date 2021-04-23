require('dotenv').config({ path: '.env' });
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const cmd = '!'

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if (!msg.content.startsWith(cmd) || msg.author.bot) return;

  if (msg.content === `${cmd}ping`) {
    msg.reply('pong');
    msg.channel.send('pong');
  }

  if (msg.content.startsWith(`${cmd}kick`)) {
    if (msg.mentions.users.size) {
      const taggedUser = msg.mentions.users.first(); w
      msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
    } else {
      msg.reply('Please tag a valid user!');
    }
  }

  if (msg.content === `${cmd}flip`) {
    var coin = require("./coin-flip.js");
    msg.channel.send(coin.flip())
  }

});
