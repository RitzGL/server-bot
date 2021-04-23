require('dotenv').config({ path: '.env' });
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const cmd = '!'
const coin = require("./coin-flip.js");
// var mdn = require('./mdn-search')

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if (!msg.content.startsWith(cmd) || msg.author.bot) return;
  const args = msg.content.slice(msg.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  // console.log(args)

  if (command === `${cmd}whatis`) {
    msg.channel.send(`https://developer.mozilla.org/en-US/search?q=${args}`);
  }

  if (command === `${cmd}2up`) {
    let flips = []
    for (let i = 0; i < 3; i++) {
      let flip = coin.flip()
      msg.channel.send(flip)
      flips.push(flip)
    }
    function getOccurrence(array, value) {
      return array.filter((v) => (v === value)).length;
    }
    if (getOccurrence(flips, 'Heads!') > 1) {
      msg.channel.send('Heads wins!')
    } else {
      msg.channel.send('Tails wins!')
    }
  }

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
    msg.channel.send(coin.flip())
  }


});
