const { User } = require('../models/index');

async function setPostcode(interaction) {
  const { id, username } = interaction.user;
  const postcode = interaction.options.getString('postcode');
  try {
    const userExists = await User.findOne({ where: { user_id: id } });
    if (!userExists) {
      const newUser = await User.create({
        user_id: id,
        username,
        postcode,
      });
      return interaction.reply({
        content: `User: ${newUser.username} CREATED with postcode set to ${newUser.postcode}`,
        ephemeral: true,
      });
    }
    await User.update(
      { postcode },
      { where: { user_id: id }, returning: true }
    );
    return interaction.reply({
      content: `User: ${username} UPDATED with postcode set to ${postcode}`,
      ephemeral: true,
    });
  } catch (error) {
    return interaction.reply(`Error in setPostcode: ${error.message}`);
  }
}

module.exports = setPostcode;
