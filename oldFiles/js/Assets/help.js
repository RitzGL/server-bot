exports.help = async function (msg, args, fs) {
    var response = await fs.readFileSync('./Assets/helpText.json');
    var stringresponse = JSON.parse(response);
    if (msg.content == "!help") {
        return msg.channel.send(stringresponse.cmd)
    }
    if (stringresponse[args]) {
        return msg.channel.send(stringresponse[args]);
    } else {
        return msg.channel.send("could not find command")
    }
}