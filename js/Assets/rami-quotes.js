const fs = require('fs');

function getRandomInt(length) {
    let int = Math.floor(Math.random() * length);
    return int;
}

function generateRandomQuote(quotes){
    let i = getRandomInt(quotes.length);
    return quotes[i];
}

exports.generateQuote = function readTextFile(msg) {


    fs.readFile("./Assets/RAMI-QUOTES.txt", "utf8", (err,data) =>{
        if (err){
            console.error(err);
            return;
        }
    
        let quoteArray = data.split("\"");
            
        let filteredArray = quoteArray.filter(quote => quote !== '\r\n') // removes weird \r\n fuckery
        filteredArray = quoteArray.filter(quote => quote !== '\n') // removes \n
            
        for(let i = 0; i < filteredArray.length; i++){
            filteredArray[i] = filteredArray[i].replace(/"/g, ''); // filters previously added \"
        }
            
        filteredArray.shift(); // removes first item, was empty string
        filteredArray.pop(); // removes last item, was empty string
            
        let quote = generateRandomQuote(filteredArray);
        console.log(quote);
        msg.channel.send(quote); 
    })    
}