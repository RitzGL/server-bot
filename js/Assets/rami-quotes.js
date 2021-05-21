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

exports.add = async function (argsString) {
    let filteredArray = await fileArrayer(10);
    filteredArray.quotes.push(`\'`+argsString.replace('?quoteadd ','')+`\'`)
    fs.writeFile(`./Assets/RAMI-QUOTES.json`, JSON.stringify(filteredArray),
        function (err) {
            if (err) return console.log(err);
            console.log(`added the quote ${argsString.replace('?quoteadd ','')}`);
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