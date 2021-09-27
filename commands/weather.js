const { User } = require('../models/index');
const { weatherToday, weatherForecast } = require('../utils/willyweather');

const wwToken = process.env.WW_TOKEN;

async function weatherFromLocation(forecast, interaction) {
  const { id } = interaction.user;

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
  if (!forecast) {
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

  const f = await weatherForecast(user.postcode, wwToken);
  if (!f) {
    return interaction.reply(
      `Error Retreiving weather data for ${user.postcode}`
    );
  }
  return interaction.reply(
    `Forecast for **${f[0]}**::\n**Today**: ${f[1].description} | Min: ${f[1].minTemp}°C | Max: ${f[1].maxTemp}°C | Rainfall: ${f[1].rain}mm @ ${f[1].rainChance}%\n**Tomorrow:** ${f[2].description} | Min: ${f[2].minTemp}°C | Max: ${f[2].maxTemp}°C | Rainfall: ${f[2].rain}mm @ ${f[2].rainChance}%\n**${f[3].day}:** ${f[3].description} | Min: ${f[3].minTemp}°C | Max: ${f[3].maxTemp}°C | Rainfall: ${f[3].rain}mm @ ${f[3].rainChance}%\n**${f[4].day}:** ${f[4].description} | Min: ${f[4].minTemp}°C | Max: ${f[4].maxTemp}°C | Rainfall: ${f[4].rain}mm @ ${f[4].rainChance}%\n**${f[5].day}:** ${f[5].description} | Min: ${f[5].minTemp}°C | Max: ${f[5].maxTemp}° | Rainfall: ${f[5].rain}mm @ ${f[5].rainChance}% `
  );
}

module.exports = { weatherFromLocation };
