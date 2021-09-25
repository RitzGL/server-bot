const { quotes } = require('../quotes/ramiQuotes.json');

function getRandomQuote() {
  return quotes[Math.floor(quotes.length * Math.random())];
}

module.exports = getRandomQuote;
