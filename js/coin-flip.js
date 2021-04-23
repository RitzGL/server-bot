// get a random number
// returns number
function getRandomFloat() {
    let int = Math.random();
    let strInt = int.toFixed(2);
    int = Number.parseFloat(strInt);
    return int;
}

// get random float
// compare to 0.5
// log or send message of result
exports.flip = function () {
    let float = getRandomFloat();
    if (float > 0.5) {
        return `Heads!` // this will be changed to whatever code to send msg to server
    } if (float == 0.5) {
        return `The coin landed on it's edge!`
    } return `Tails!`
}


// loop for testing, seems to favour tails
// for(let i = 0; i < 50; i++){
//     flipCoin();
// }
