const { ModuleKind } = require('typescript');
const { User } = require('../models/index');
const { weatherToday } = require('../utils/willyweather');

const wwToken = process.env.WW_TOKEN;

async function weatherFromLocation(interaction) {
  const { id, username } = interaction.user;

  // check if WW_TOKEN Exists
  if (!process.env.WW_TOKEN) {
    return interaction.reply(
      'No Willy Weather Token found in Environment Variables'
    );
  }
  // check if you exist on the DB?
  const user = await User.findOne({ where: { user_id: id } });
  if (!user) {
    return interaction.reply(
      'You havent set a postcode! set with `/setpostcode`'
    );
  }
  // get current weather for saved postcode
  const w = await weatherToday(user.postcode, wwToken);
  if (!w) {
    return interaction.reply(
      `Error Retreiving weather data for ${user.postcode}`
    );
  }

  return interaction.reply(
    `**${w.stationName}** current conditions - **${w.currentTemp}°C** @  **${w.currentHumidity}%** humidity. Wind is **${w.windSpeed}km/h** from the **${w.windDir}**. Rainfall today **${w.rainTotal}mm**. Forecast for today, **${w.forecastWords}** | **${w.forecastMax}°C** / **${w.forecastMin}°C** |. **${w.rainChance}%** chance of **${w.rainRangeStart} ${w.rainRangeDivide} ${w.rainRangeEnd}mm** of rain. `
  );
}

module.exports = { weatherFromLocation };
