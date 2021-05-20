songArray = []
const { Message } = require('discord.js');
const ytdl = require('ytdl-core');

const voiceConnections = new Map()

exports.play = async function (msg, command, cmd, args, discordClient) {
    // // const dispatcher = connection.play('/home/discord/audio.mp3');


    if (command === `${cmd}join`) {
        if (msg.member.voice.channel) {
            let voiceConnection = await msg.member.voice.channel.join()
            var dispatcher
            voiceConnections.set(msg.guild.id, {
                textChannel: msg.channel,
                voiceChannel: msg.member.voice.channel,
                connection: voiceConnection,
                songQueue: [],
                volume: 5,
                playing: false
            })
        } else {
            msg.reply('You need to join a voice channel first!');
        }
    }
    if (command === `${cmd}leave`) {
        if (msg.guild.me.voice.channel) {
            msg.guild.me.voice.channel.leave();
        } else {
            msg.reply('I\'m not in a voice channel');
        }
    }

    if (command === `${cmd}play`) {
        var guildInfo = voiceConnections.get(msg.guild.id)
        dispatcher = guildInfo.connection.play(ytdl(args, { filter: 'audioonly' }))
            .on('finish', () => {
                console.log('Finished playing song!')
            })
            .on('error', err => console.error(`Failed to play song - ${err}`));
        dispatcher.setVolumeLogarithmic(guildInfo.volume / 5);
        guildInfo.textChannel.send(`Started playing a song! (*but which one* :eyes:)`);
    }

    if (command === `${cmd}volume`) {
        console.log(`set volume to ${args}`)
        dispatcher.setVolumeLogarithmic(guildInfo.volume / args)
    }
}