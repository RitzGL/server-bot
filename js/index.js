require('dotenv').config({ path: '.env' });
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const cmd = '?';
const coin = require("./Assets/coin-flip.js");
const axios = require('axios');
const stock = require('./Assets/stock');
const readme = require('./Assets/READMEGen');
const quotes = require('./rami-quotes');
const { title } = require('process');
//const music = require('./Assets/music')
fs = require('fs');
const joke = require('./Assets/dadJokes');

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', async msg => {
  if (!msg.content.startsWith(cmd) || msg.author.bot) return;
  const args = msg.content.slice(msg.length).trim().split(' ');
  const argsString = msg.content;
  const command = args.shift().toLowerCase();

  if (command === `${cmd}whatis`) {
    msg.channel.send(`https://developer.mozilla.org/en-US/search?q=${args}`);
  }

  if (command === `${cmd}joke`) {
    joke.dad(msg, axios)
  }

  if (msg.content === `${cmd}flip`) {
    msg.channel.send(coin.flip())
  }
  if (command === `${cmd}2up`) {
    coin.twoUp(msg)
  }

  if (msg.content === `${cmd}ping`) {
    msg.reply('pong');
  }
  if (msg.content === `${cmd}pong`) {
    msg.reply('ping');
  }

  if (msg.content === `${cmd}monkey` || msg.content === `${cmd}monke`) {
    msg.delete()
    msg.channel.send({
      files: ['./test/Monky.webp']
    });
  }

  if (command === `${cmd}stock`) {
    stock.basic(msg, args, axios)
  }

  //if (command === `${cmd}join`|| command === `${cmd}play`) {
  // }

  //await music.play(msg,command,cmd,args,bot)
  
  // if (command === `${cmd}play`) {
  //   music.play(args)
  // }

});

bot.on('message', msg => { readme.gen(msg, fs, cmd) })