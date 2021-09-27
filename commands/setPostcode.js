const { User } = require('../models/index');

async function setPostcode(interaction) {
  // extract the info
  const { id, username } = interaction.user;
  const postcode = interaction.options.getString('postcode');
  // prob should search to see if a user exists --> abstract to util function
  try {
    const userExists = await User.findOne({ where: { user_id: id } });
    if (!userExists) {
      const newUser = await User.create({
        user_id: id,
        username,
        postcode,
      });
      return interaction.reply(
        `User: ${newUser.username} CREATED with postcode set to ${newUser.postcode}`
      );
    }
    const updatedUser = await User.update(
      { postcode },
      { where: { user_id: id }, returning: true }
    );
    return interaction.reply(
      `User: ${username} UPDATED with postcode set to ${postcode}`
    );
  } catch (error) {
    return interaction.reply(`Error in setWeather: ${error.message}`);
  }
  // add it to database

  // send confirmation message
}

module.exports = setPostcode;
