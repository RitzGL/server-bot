const fs = require('fs');

function getRandomInt(length) {
    let int = Math.floor(Math.random() * length);
    return int;
}

function generateRandomQuote(quotes) {
    let i = getRandomInt(quotes.length);
    return quotes[i];
}

exports.generateQuote = async function readTextFile(msg) {
    var quotes = await fileArrayer(10);

    let quote = generateRandomQuote(quotes.quotes);
    msg.channel.send(quote);
}

exports.add = async function (argsString, msg) {
    let filteredArray = await fileArrayer(10);
    filteredArray.quotes.push(`\'` + argsString.replace('!addquote ', '') + `\'`)
    fs.writeFile(`./Assets/RAMI-QUOTES.json`, JSON.stringify(filteredArray).replace(/","/g,'",\n"'),
        function (err) {
            if (err) return console.log(err);
            msg.channel.send(`added the quote ${argsString.replace('!addquote ', '')}`);
        })
}

exports.all = async function (msg) {
    msg.channel.send({
        files: ['./Assets/RAMI-QUOTES.json']
      })
}

function fileArrayer(quotes) {
    return new Promise(resolve => {
        fs.readFile("./Assets/RAMI-QUOTES.json", "utf8", (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            let datatrans = JSON.parse(data)
            resolve(datatrans)
        })
    });
}