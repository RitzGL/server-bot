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
flip = exports.flip = function () {
    let float = getRandomFloat();
    if (float > 0.5) {
        return `Heads!` // this will be changed to whatever code to send msg to server
    } if (float == 0.5) {
        return `The coin landed on it's edge!`
    } return `Tails!`
}

exports.twoUp = function (msg) {
    let flips = []
    for (let i = 0; i < 3; i++) {
        let flipped = flip()
        msg.channel.send(flipped)
        flips.push(flipped)
        console.log(flipped)
    }
    function getOccurrence(array, value) {
        return array.filter((v) => (v === value)).length;
    }
    if (getOccurrence(flips, 'Heads!') > 1) {
        msg.channel.send('Heads wins!')
    } else {
        msg.channel.send('Tails wins!')
    }
}

