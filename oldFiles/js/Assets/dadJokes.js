exports.dad = function(msg,axios){axios(`https://icanhazdadjoke.com/slack`)
.then(response => msg.channel.send(response.data.attachments[0].text))}