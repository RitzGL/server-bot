const fs = require('fs');

function readTextFile() {
    fs.readFile("./RAMI-QUOTES.txt", "utf8", (err,data) =>{
        if (err){
            console.error(err);
            return;
        }
        let quoteArray = data.split("\"");
        let filteredArray = quoteArray.filter(quote => quote !== '\r\n') // removes \r\n (new line char in Windows)
        for(let i = 0; i < filteredArray.length; i++){
            filteredArray[i] = filteredArray[i].replace(/'/g, ''); // filters previously added \"
        }
        console.log(filteredArray);
    })
}

// readTextFile();

function generateRandomQuote(){
    
}