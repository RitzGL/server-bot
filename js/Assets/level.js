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
            fs.writeFileSync(`./Assets/userProfiles/${msg.author.id}.json`, JSON.stringify(JSON.parse('{"user":"blank"}')), function (err) {
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
            var test = JSON.parse(value)
            if (value.toString().includes('level')) {
            } else {
                // var user = value.user

                abc = "level"
                test[abc] = 1
                test["exp"] = 0
                fs.writeFileSync(`./Assets/userProfiles/${msg.author.id}.json`, JSON.stringify(test), function (err) {
                    // console.log(err);
                    console.log(`${msg.author.username} file updated`);
                })
            }
            return test
        }).then((user) => {
            newExp = msg.content.length
            user["exp"] += newExp
            user["user"] = msg.author.username
            fs.writeFileSync(`./Assets/userProfiles/${msg.author.id}.json`, JSON.stringify(user), function (err) {
            })
            return user
        }).then((user) => {
            if (user["exp"] / (user["level"] * 1.15 * 100) >= 1) {
                user["exp"] = 0
                user["level"] += 1
                fs.writeFile(`./Assets/userProfiles/${msg.author.id}.json`, JSON.stringify(user), function (err) {
                })
                msg.reply(`You leveled up to level ${user["level"]}`)
            }
        })
    })
}

exports.levelCheck = function (msg) {
    const userID = msg.author.id
    const file = `./Assets/userProfiles/${userID}.json`
    var jsonContent = async (file) => {
        return response = await fs.readFileSync(file)
    }
    jsonContent(file).then((value) => {
        var user = JSON.parse(value)
        msg.reply(`your level is ${user["level"]} and you have ${user["exp"]}XP of ${Math.ceil(user["level"] * 1.15 * 100)}XP`)
    })
}