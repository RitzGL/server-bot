songArray = []
const ytdl = require('ytdl-core');


exports.play = function (msg,command,cmd,args,bot) {
    const broadcast = bot.voice.createBroadcast();
broadcast.play('./music.mp3');
// Play "music.mp3" in all voice connections that the client is in
for (const connection of client.voice.connections.values()) {
  connection.play(broadcast);
}
    if (msg.member.voice.channel) {
        connection.join().then(connection => {
            if (command === `${cmd}play`) {
                connection.play(ytdl(args, { filter: 'audioonly' }));
            }
        });
      } else {
        msg.reply('You need to join a voice channel first!');
      }
}