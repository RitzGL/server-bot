require('dotenv').config({ path: '.env' });
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const cmd = '!'
const coin = require("./coin-flip.js");
const axios = require('axios');
const { title } = require('process');
// const FileSaver = require('file-saver'); //uninstall
// const Blob = require("cross-blob"); //uninstall
fs = require('fs');
// var mdn = require('./mdn-search')

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {


  if (!msg.content.startsWith(cmd) || msg.author.bot) return;
  const args = msg.content.slice(msg.length).trim().split(' ');
  const argsString = msg.content;
  const command = args.shift().toLowerCase();
  // console.log(args)

  if (command === `${cmd}whatis`) {
    msg.channel.send(`https://developer.mozilla.org/en-US/search?q=${args}`);
  }

  if (command === `${cmd}joke`) {
    const jokeRespone = axios(`https://icanhazdadjoke.com/slack`)
      .then(response => msg.channel.send(response.data.attachments[0].text))
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

  if (msg.content === `${cmd}monkey`) {
    msg.delete()
    msg.channel.send({
      files: ['./test/Monky.webp']
    });
  }


});


bot.on('message', msg => {
  if (msg.content === `${cmd}readme`) {
    wordCatcher(msg)
  };
});

function wordCatcher(msg) {
  var collectedText = []
  var initiator = msg.member
  const filter = m => m.member == initiator;
  const collector = msg.channel.createMessageCollector(filter, { idle: 60000 });

  collector.on('collect', m => {
    if (m.content === 'stop') {
      collector.stop()
      console.log('stopped')
    } else {
      console.log(`Collected ${m.content}`);
      let readmeText = ''
      readmeText += m.content
      let mdAdjust = readmeText.replace('heading', '##')
      mdAdjust = mdAdjust.replace('subtitle', '###')
      mdAdjust = mdAdjust.replace('title', '#')
      collectedText.push(mdAdjust)
    }
  });

  collector.on('end', collected => {
    console.log(`Collected ${collectedText.length} items`);

    let finalContent = '';

    collectedText.forEach(element => {
      finalContent += (element + '\n');
    })
    makeReadme(finalContent, msg)
  });
}

function makeReadme(str, msg) {
  fs.writeFile('helloworld.md', `${str}`, function (err) {
    if (err) return console.log(err);
    console.log('Hello World > helloworld.md');
  });
  msg.channel.send({
    files: ['helloworld.md']
  });
}