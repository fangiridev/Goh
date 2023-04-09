const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const User = require("../../Schema/user");
const Utils = require("../../utils/utils.js")
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    name: 'gohcoins',
    description: 'See how many GohCoins you own!',
    name_localizations: {
      'pt-BR': 'gohcoins',
      'en-US': 'gohcoins',
    },
    description_localizations: {
      'pt-BR': '💸Economia » Veja quantos GohCoins você possui!',
      'en-US': '💸Economy » See how many GohCoins you own!',
    },
    category: {
      pt: 'Economia',
      en: 'Economy'
    },
    botPerms: [''],
    userPerms: [''],
    owner: false,
    options: [ 
      {
        name: "user",
        description: "User who wants to see the GohCoins!",
        type: ApplicationCommandOptionType.User,
        required: false,
        name_localizations: {
          'pt-BR': 'usuário',
          'en-US': 'user',
        },
        description_localizations: {
          'pt-BR': 'Usuário que deseja ver os GohCoins!',
          'en-US': 'User who wants to see the GohCoins!'
        }
      },
    ],
    pt: {
      name: "gohcoins",
      category: "💸 Economia"
  },
   run: async ({ client, interaction, language, args }, t) => {
    const { money } = require("../../config");
    const USER =
      interaction.options.getUser("user") ||
      interaction.user;

    User.findOne({ id: USER.id }, async (err, user) => {
      if (!user) {
        await User.create({
          id: interaction.user.id
        });

        interaction.reply({ content: `Ops, vi que você não foi salvo na minha database, mas salvei você agora, use o comando novamente!`})
      }
      let pesadelos = user.pesadelos;
      let abrev = Utils.toAbbrev(pesadelos);
      if(user) return interaction.reply({ content: `${t('commands:coins.replyuser', { abrev: abrev, money: money, pesadelos, user: USER })}` })

      interaction.reply({ content: `${t('commands:coins.reply', { abrev: abrev, money: money, pesadelos })}` })
    });
   }
}