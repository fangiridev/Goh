const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const User = require("../../Schema/user");
const Utils = require("../../utils/utils.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    name: 'aboutme',
    description: 'Change the text that will be displayed on the profile!',
    description_localizations: {
      'pt-BR': '💡Diversos » Altere o texto que será exibido no perfil!',
      'en-US': '💡Miscellaneous » Change the text that will be displayed on the profile!',
    },
    botPerms: [''],
    userPerms: [''],
    owner: false,
    category: {
      pt: 'Diversos',
      en: 'Miscellaneous'
    },
    options: [ 
      {
        name: "text",
        description: "Text!",
        type: ApplicationCommandOptionType.String,
        required: true,
        name_localizations: {
          'pt-BR': 'texto',
          'en-US': 'text',
        },
        description_localizations: {
          'pt-BR': 'Texto!',
          'en-US': 'Text!'
        }
      },
    ],
    pt: {
      name: "sobremim",
      category: "💡 Diversos"
  },
   run: async ({ client, interaction, language, args }, t) => {
    const about = interaction.options.getString('text');
    const doc = await User.findOne({ id: interaction.user.id });

    if (about.length > 150)
      return interaction.reply({ content: `${t('commands:about.error', { user: interaction.user })}` });

    interaction.reply({ content: `${t("commands:about.sucess", { user: interaction.user, about })}` });
    await User.findOneAndUpdate(
      { id: interaction.user.id },
      { $set: { about: about } }
    );
   }
}