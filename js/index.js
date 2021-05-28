require('dotenv').config({ path: '.env' });
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const cmd = '?';
const coin = require("./Assets/coin-flip.js");
const axios = require('axios');
const leveling = require('./Assets/level')
const stock = require('./Assets/stock')
const readme = require('./Assets/READMEGen')
const bDay = require('./Assets/birthday')
const quotes = require('./Assets/rami-quotes');
const { title } = require('process');
const music = require('./Assets/music')
fs = require('fs');
const joke = require('./Assets/dadJokes')
const inspire = require(`./Assets/inspire`)
const pomodoro = require(`./Assets/pomodoro`)
bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  leveling.check(msg);
  if (!msg.content.startsWith(cmd) || msg.author.bot) return;
  const args = msg.content.slice(msg.length).trim().split(' ');
  const argsString = msg.content;
  const command = args.shift().toLowerCase();

  if (command == `${cmd}whatis`) {
    msg.channel.send(`https://developer.mozilla.org/en-US/search?q=${args}`);
  }

  if (command == `${cmd}joke`) {
    joke.dad(msg, axios)
  }

  if (command == `${cmd}level`) {
    leveling.levelCheck(msg)
  }

  if (msg.content == `${cmd}flip`) {
    msg.channel.send(coin.flip())
  }
  if (command == `${cmd}2up`) {
    coin.twoUp(msg)
  }

  if (msg.content == `${cmd}ping`) {
    msg.reply('pong');
  }
  if (msg.content == `${cmd}pong`) {
    msg.reply('ping');
  }

  if (msg.content == `${cmd}monkey` || msg.content == `${cmd}monke`) {
    msg.delete()
    msg.channel.send({
      files: ['./test/Monky.webp']
    });
  }

  if (command == `${cmd}stock`) {
    stock.basic(msg, args, axios)
  }


  if(command == `${cmd}quote`){
    quotes.generateQuote(msg);
  }
  if(command == `${cmd}addquote`){
    quotes.add(argsString,msg);
  }
  if(command == `${cmd}allquotes`){
    quotes.all(msg);
  }

  if (command == `${cmd}inspire`) {
    inspire.inspire(msg, args, fs)
  }

  if (command == `${cmd}pomodoro`) {
    pomodoro.timer(msg, fs)
    console.log(msg.author.id)
    // let user = require(`./Assets/${msg.author.id}`)
  }

  if (command == `${cmd}stoppom`) {
    pomodoro.endTimer(msg, fs)
    console.log(msg.author.id)
    // let user = require(`./Assets/${msg.author.id}`)
  }

  if(command == `${cmd}birthday`) {
    bDay.birth(msg,args)
  } 

  if (command == `${cmd}tough`) {
    msg.author.send('Do better... Please')
  }


  if (command == `${cmd}join` || command === `${cmd}play` || command === `${cmd}volume` || command === `${cmd}leave`) {
    music.play(msg, command, cmd, args)
  }

  if (command == `${cmd}mock`) {
    let str = args.toString()
    str = str.split("")
    for (let i = 0; i < str.length; i++) {
      if (Math.random() > 0.5) {
        // console.log(str[i])
        str[i] = str[i].toUpperCase()
      }
      else {
        str[i] = str[i].toLowerCase()
      }
    }
    str = str.toString().split(',').join(' ')
    msg.channel.send(str)
  }
});

bot.on('message', msg => { readme.gen(msg, fs, cmd) })