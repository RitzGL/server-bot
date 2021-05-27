const { TIMEOUT } = require('dns')
const fs = require('fs')
// var user
exports.check = function (msg) {
    const userID = msg.author.id
    const file = `./Assets/userProfiles/${userID}.json`
    var filePromise = async () => {
        return response = await fs.existsSync(file)
    }
    filePromise().then((value) => {
        if (value === true) {
            return
        } else {
            fs.writeFileSync(`./Assets/userProfiles/${msg.author.id}.json`, JSON.stringify(JSON.parse('{"user":[]}')), function (err) {
                console.log(err);
                console.log(`${msg.author.username} file created`);
                msg.reply("You are now in the system. Rami is watching :eyes:")
            })
        }
    }).then(() => {
        var jsonContent = async (file) => {
            return response = await fs.readFileSync(file)
        }
        jsonContent(file).then((value) => {
            if (value.toString().includes('level')) {
            } else {
                // var user = value.user
                console.log(JSON.parse(value))
                var test = JSON.parse(value)
                abc = "level"
                test[abc] = "1"
                test["exp"] = "1"
                fs.writeFile(`./Assets/userProfiles/${msg.author.id}.json`, JSON.stringify(test), function (err) {
                    // console.log(err);
                    console.log(`${msg.author.username} file updated`);
                })
            }
            return value
        }).then((value) => {
            const user = JSON.parse(value)
            console.log(user)
            newExp = msg.content.length
            user["exp"] + 1
            console.log(user)
            fs.writeFile(`./Assets/userProfiles/${msg.author.id}.json`, JSON.stringify(user), function (err) {
            })
            return user
        }).then((user) => {
            console.log(user)
            // if (user["exp"] / (user["level"] * 1.5 * 100) >= 1) {
            //     fs.writeFile(`./Assets/userProfiles/${msg.author.id}.json`, JSON.stringify(user), function (err) {
            //     })
            //     msg.reply(`You leveled up to level ${user["level"]}`)
            // }
        })
    })
}