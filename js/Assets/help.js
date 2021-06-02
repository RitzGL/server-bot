exports.help = async function (msg,args,fs) {
    // var json = fs.
    // msg.channel.send(args)
    var response = await fs.readFileSync('./Assets/helpText.json');
    var stringresponse = JSON.parse(response);
    if (stringresponse[args]) {
        msg.channel.send(stringresponse[args]); 
    } else {
        msg.channel.send("could not find command")
    }
}