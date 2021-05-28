const fs = require('fs')
const level = require('./level')

exports.birth = async function (msg, args) {
    level.check(msg)
    if(!args[0]){
        msg.reply("please specify a person")
        return
    }else{
    if(args[0].includes('<@!')) {
        var userID = args[0].toString().replace('<@!','').replace('>','')
        var file = `./Assets/userProfiles/${userID}.json`
    } else{
        msg.reply("please specify a person")
        return
    }}
    var jsonContent = async (file) => {
        return response = await fs.readFileSync(file)
    }
    jsonContent(file).then((value) => {
        var user = JSON.parse(value)
        if (value.toString().includes('birthday') && args[1]) {
            user["birthday"] = args[1]
            fs.writeFileSync(`./Assets/userProfiles/${userID}.json`, JSON.stringify(user), function (err) {
            })
        } else {
            if(!args[1]){
                msg.channel.send(`${user["user"]}'s birthday is on ${user["birthday"]}`)
            } else{
            user["birthday"] = args[1]
            fs.writeFileSync(`./Assets/userProfiles/${userID}.json`, JSON.stringify(user), function (err) {
            })
    }}
    })
}