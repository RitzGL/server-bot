exports.basic = function (msg, args, axios) {
    args.forEach(element => {
        console.log(element)
        axios(`https://www.coinspot.com.au/pubapi/v2/latest/${element}`).then(function (data) {
            if (!data.data.prices) {
                return msg.channel.send(`No prices found for ${element}`)
            }
            msg.channel.send(`${element} current market value:\nBid: ${data.data.prices.bid}\nAsk: ${data.data.prices.ask}\nLast: ${data.data.prices.last}`)
        })
    });
}