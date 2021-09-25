exports.timer = function (msg, fs) {
    msg.channel.send('timer should start now')
    fs.writeFile(`./Assets/secretStuff/${msg.author.id}.js`, ` var alert;
    exports.interval = function (msg) {
        let pomos = 0
        pomodoro()
        alert = setInterval(() => {
            pomodoro()
        }, 90000);
        function pomodoro() {
            msg.author.send('Start working! <3')
            var a = setTimeout(() => {
                pomos++
                msg.author.send(\`Take a break for 5 minutes, \${pomos} Pomodoros!\`) 
            },900000)
            var b = setTimeout(() => {
                msg.author.send('get back to work!!') 
            },1200000)
            var c = setTimeout(() => {
                pomos++
                msg.author.send(\`Take a break for 5 minutes, \${pomos} Pomodoros!\`) 
            },2100000)
            var d = setTimeout(() => {
                msg.author.send('get back to work!!') 
            },2400000)
            var e = setTimeout(() => {
                pomos++
                msg.author.send(\`Take a break for 5 minutes, \${pomos} Pomodoros!\`) 
            },3300000)
            var f = setTimeout(() => {
                msg.author.send('get back to work!!') 
            },3600000)
            var g = setTimeout(() => {
                pomos++
                msg.author.send(\`take 30 mins off you deserve it, \${pomos} Pomodoros!\`) 
            },4500000)            exports.stop = function () {
                clearInterval(alert)
                let timeouts = [a,b,c,d,e,f,g]
        
                for (let i = 0; i < timeouts.length; i++) {
                    const timeout = timeouts[i];
                    clearTimeout(timeout)
                }
        }
    }
    }`, function (err) {
        if (err) return console.log(err);
        console.log(`${msg.author.username} has created a timer`);
    })


    setTimeout(() => {
        let timer = require(`./secretStuff/${msg.author.id}.js`)
        timer.interval(msg)
    }, 600);
}


exports.endTimer = function (msg, fs) {
    let timer = require(`./secretStuff/${msg.author.id}.js`)
    timer.stop()
    console.log(`timer stopped`)
    msg.reply('timer stopped')
    fs.unlink(`./Assets/secretStuff/${msg.author.id}.js`, (err) => {
        if (err) {
            console.error(err)
            return
        }
        //file removed
    })
}